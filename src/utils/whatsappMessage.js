import store from "../config/store.js";
import { formatCurrency } from "./formatCurrency.js";
import { formatAddress } from "./googleMaps.js";
import { normalizeWhatsapp } from "./links.js";

/**
 * Monta o texto do pedido.
 * order = { lines, totals, mode, customer: { name, street, number, district, reference, payment, notes } }
 */
export function buildOrderMessage(order) {
  const { lines, totals, mode, customer } = order;
  const out = [];

  out.push(store.messages.orderIntro);
  out.push(`*${store.name}*`);
  out.push("");
  out.push(`👤 *Cliente:* ${customer.name.trim()}`);
  out.push("");
  out.push("🍔 *Itens do pedido*");

  lines.forEach((line, index) => {
    const size = line.size ? ` (${line.size.label})` : "";
    out.push(`${index + 1}. ${line.qty}x ${line.product.name}${size} - ${formatCurrency(line.lineTotal)}`);
    line.addons.forEach((a) => {
      out.push(`   + ${a.name}${a.price ? ` (${formatCurrency(a.price)})` : ""}`);
    });
    if (line.note.trim()) out.push(`   Obs.: ${line.note.trim()}`);
  });

  out.push("");
  if (mode === "delivery") {
    out.push("🛵 *Modalidade:* Entrega");
    const addressLine = [
      [customer.street, customer.number].map((v) => (v ?? "").trim()).filter(Boolean).join(", "),
      customer.district?.trim(),
      [store.address.city, store.address.state].filter(Boolean).join(" - "),
    ]
      .filter(Boolean)
      .join(" - ");
    out.push(`📍 *Endereço:* ${addressLine}`);
    if (customer.reference?.trim()) out.push(`📌 *Referência:* ${customer.reference.trim()}`);
  } else {
    out.push("🏪 *Modalidade:* Retirada no local");
    const pickupAddress = formatAddress(store.address);
    if (pickupAddress) out.push(`📍 *Retirada em:* ${pickupAddress}`);
  }

  out.push("");
  out.push(`Subtotal: ${formatCurrency(totals.subtotal)}`);
  if (mode === "delivery") {
    if (totals.feeToBeInformed) {
      out.push("Taxa de entrega: a informar pela loja");
    } else {
      out.push(`Taxa de entrega: ${totals.deliveryFee ? formatCurrency(totals.deliveryFee) : "grátis"}`);
    }
  }
  out.push(`💰 *Total: ${formatCurrency(totals.total)}*${totals.feeToBeInformed ? " (sem a taxa de entrega)" : ""}`);

  if (customer.payment) {
    out.push(`💳 *Pagamento na ${mode === "delivery" ? "entrega" : "retirada"}:* ${customer.payment}`);
  }
  if (customer.notes?.trim()) {
    out.push("");
    out.push(`📝 *Observações gerais:* ${customer.notes.trim()}`);
  }

  return out.join("\n");
}

/** Link oficial do WhatsApp com a mensagem codificada. Retorna "" se o número não estiver configurado. */
export function buildWhatsappOrderUrl(order) {
  const number = normalizeWhatsapp(store.whatsapp);
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(buildOrderMessage(order))}`;
}
