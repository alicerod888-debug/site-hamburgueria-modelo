import { useState } from "react";
import store from "../config/store.js";
import useDialog from "../hooks/useDialog.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import CheckoutForm from "./CheckoutForm.jsx";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "./Icons.jsx";

export default function CartDrawer({ cart, onClose }) {
  const dialogRef = useDialog(true, onClose);
  const [step, setStep] = useState("cart"); // cart | checkout
  const { lines, setQty, remove, clear } = cart;
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const minimum = store.ordering.minimumOrder || 0;
  const belowMinimum = minimum > 0 && subtotal < minimum;

  return (
    <div className="overlay overlay--side" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside ref={dialogRef} className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="drawer__head">
          <h2 id="cart-title">{step === "cart" ? "Seu carrinho" : "Finalizar pedido"}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar carrinho">
            <CloseIcon />
          </button>
        </header>

        {step === "cart" ? (
          <>
            <div className="drawer__body">
              {lines.length === 0 ? (
                <div className="drawer__empty">
                  <p>{store.messages.emptyCart}</p>
                  <button type="button" className="btn btn--outline-dark" onClick={onClose}>Ver cardápio</button>
                </div>
              ) : (
                <ul className="lines">
                  {lines.map((line) => (
                    <li key={line.key} className="line">
                      <div className="line__info">
                        <p className="line__name">
                          {line.product.name}
                          {line.size && <span className="line__size"> ({line.size.label})</span>}
                        </p>
                        {line.addons.length > 0 && (
                          <p className="line__meta">{line.addons.map((a) => `+ ${a.name}`).join(", ")}</p>
                        )}
                        {line.note && <p className="line__meta">Obs.: {line.note}</p>}
                        <p className="line__unit">{formatCurrency(line.unitPrice)} cada</p>
                      </div>
                      <div className="line__side">
                        <p className="line__total">{formatCurrency(line.lineTotal)}</p>
                        <div className="stepper stepper--sm" role="group" aria-label={`Quantidade de ${line.product.name}`}>
                          <button type="button" className="icon-btn" onClick={() => setQty(line.key, line.qty - 1)} aria-label={line.qty === 1 ? `Remover ${line.product.name}` : `Diminuir quantidade de ${line.product.name}`}>
                            {line.qty === 1 ? <TrashIcon width={16} height={16} /> : <MinusIcon width={16} height={16} />}
                          </button>
                          <output aria-live="polite">{line.qty}</output>
                          <button type="button" className="icon-btn" onClick={() => setQty(line.key, line.qty + 1)} aria-label={`Aumentar quantidade de ${line.product.name}`}>
                            <PlusIcon width={16} height={16} />
                          </button>
                        </div>
                        <button type="button" className="link-btn" onClick={() => remove(line.key)}>Remover</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="drawer__foot">
                <div className="totals">
                  <div className="totals__row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
                  <p className="totals__note">Taxa de entrega e total são calculados na próxima etapa.</p>
                </div>
                {belowMinimum && (
                  <p className="notice notice--warn" role="alert">
                    Pedido mínimo: {formatCurrency(minimum)}. Faltam {formatCurrency(minimum - subtotal)}.
                  </p>
                )}
                <button type="button" className="btn btn--solid btn--block" onClick={() => setStep("checkout")} disabled={belowMinimum}>
                  Continuar
                </button>
                <button type="button" className="link-btn link-btn--center" onClick={clear}>Esvaziar carrinho</button>
              </footer>
            )}
          </>
        ) : (
          <CheckoutForm lines={lines} onBack={() => setStep("cart")} onClear={() => { clear(); onClose(); }} />
        )}
      </aside>
    </div>
  );
}
