import { formatCurrency } from "../utils/formatCurrency.js";
import { CartIcon } from "./Icons.jsx";

/** Barra fixa no rodapé do celular quando há itens no carrinho. */
export default function CartBar({ itemCount, subtotal, onOpen }) {
  if (itemCount === 0) return null;
  return (
    <div className="cartbar">
      <button type="button" className="btn btn--solid btn--block cartbar__btn" onClick={onOpen}>
        <CartIcon />
        <span>Ver carrinho ({itemCount} {itemCount === 1 ? "item" : "itens"})</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </button>
    </div>
  );
}
