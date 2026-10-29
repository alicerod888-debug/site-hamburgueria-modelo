import store from "../config/store.js";
import products from "../data/products.js";
import addonGroups from "../data/addons.js";

const round = (n) => Math.round(n * 100) / 100;

export const productsById = new Map(products.map((p) => [p.id, p]));

/** Preço base de um produto (menor tamanho quando há tamanhos). */
export function startingPrice(product) {
  if (product.sizes?.length) return Math.min(...product.sizes.map((s) => s.price));
  return product.price ?? 0;
}

/** Grupos de adicionais válidos de um produto, já resolvidos. */
export function getAddonGroups(product) {
  return (product.addons ?? [])
    .map((groupId) => {
      const group = addonGroups[groupId];
      return group ? { id: groupId, ...group } : null;
    })
    .filter(Boolean);
}

/**
 * Converte uma referência salva no carrinho ({productId, sizeId, addonIds, qty, note})
 * em uma linha com preços calculados a partir dos dados atuais do cardápio.
 * Retorna null se o produto não existe mais ou está indisponível.
 */
export function resolveLine(ref) {
  const product = productsById.get(ref.productId);
  if (!product || product.available === false) return null;

  let size = null;
  let basePrice = product.price ?? 0;
  if (product.sizes?.length) {
    size = product.sizes.find((s) => s.id === ref.sizeId) ?? null;
    if (!size) return null;
    basePrice = size.price;
  }

  const allowed = new Map();
  getAddonGroups(product).forEach((g) => g.items.forEach((item) => allowed.set(item.id, item)));
  const addons = (ref.addonIds ?? []).map((id) => allowed.get(id)).filter(Boolean);

  const unitPrice = round(basePrice + addons.reduce((sum, a) => sum + a.price, 0));
  const qty = Math.max(1, Math.floor(ref.qty || 1));

  return {
    key: ref.key,
    product,
    size,
    addons,
    qty,
    note: ref.note ?? "",
    unitPrice,
    lineTotal: round(unitPrice * qty),
  };
}

/** Subtotal, taxa de entrega e total. mode: "delivery" | "pickup". */
export function computeTotals(lines, mode) {
  const subtotal = round(lines.reduce((sum, l) => sum + l.lineTotal, 0));
  const { delivery } = store.ordering;

  let deliveryFee = 0;
  let feeToBeInformed = false;
  if (mode === "delivery" && delivery.enabled) {
    if (delivery.fee === null || delivery.fee === undefined) {
      feeToBeInformed = true;
    } else if (delivery.freeAbove && subtotal >= delivery.freeAbove) {
      deliveryFee = 0;
    } else {
      deliveryFee = delivery.fee;
    }
  }

  return {
    subtotal,
    deliveryFee,
    feeToBeInformed,
    total: round(subtotal + deliveryFee),
  };
}
