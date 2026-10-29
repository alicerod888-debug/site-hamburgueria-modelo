import { useMemo, useRef, useState } from "react";
import store from "../config/store.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import { normalizeWhatsapp } from "../utils/links.js";
import { computeTotals } from "../utils/pricing.js";
import { buildWhatsappOrderUrl } from "../utils/whatsappMessage.js";
import { WhatsAppIcon } from "./Icons.jsx";

const { delivery, pickup, paymentOptions, minimumOrder } = store.ordering;

const MODES = [
  delivery.enabled && { id: "delivery", label: "Entrega", hint: delivery.estimate && `Prazo estimado: ${delivery.estimate}` },
  pickup.enabled && { id: "pickup", label: "Retirada no local", hint: pickup.estimate && `Prazo estimado: ${pickup.estimate}` },
].filter(Boolean);

const EMPTY = { name: "", street: "", number: "", district: "", reference: "", payment: "", notes: "" };

function validate(values, mode) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (mode === "delivery") {
    if (!values.street.trim()) errors.street = "Informe a rua.";
    if (!values.number.trim()) errors.number = "Informe o número (ou s/n).";
    if (!values.district.trim()) errors.district = "Informe o bairro.";
  }
  return errors;
}

function Field({ id, label, error, optional, children }) {
  return (
    <div className={`field ${error ? "field--error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {optional && <span className="field-group__hint"> (opcional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="field__error">{error}</p>}
    </div>
  );
}

export default function CheckoutForm({ lines, onBack, onClear }) {
  const formRef = useRef(null);
  const [mode, setMode] = useState(MODES[0]?.id ?? "");
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sentUrl, setSentUrl] = useState("");

  const totals = useMemo(() => computeTotals(lines, mode), [lines, mode]);
  const whatsappReady = Boolean(normalizeWhatsapp(store.whatsapp));
  const belowMinimum = minimumOrder > 0 && totals.subtotal < minimumOrder;
  const cannotOrder = !whatsappReady || MODES.length === 0 || lines.length === 0 || belowMinimum;

  const set = (field) => (event) => setValues((v) => ({ ...v, [field]: event.target.value }));
  const props = (id) => ({
    id,
    value: values[id],
    onChange: set(id),
    "aria-invalid": errors[id] ? "true" : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
  });

  const submit = (event) => {
    event.preventDefault();
    if (cannotOrder) return;

    const found = validate(values, mode);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`#${firstInvalid}`)?.focus();
      return;
    }

    const url = buildWhatsappOrderUrl({ lines, totals, mode, customer: values });
    if (!url) return;
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (sentUrl) {
    return (
      <div className="drawer__body">
        <div className="notice notice--info" role="status">
          <p>{store.messages.whatsappSentNotice}</p>
        </div>
        <p className="sent__text">Se o WhatsApp não abriu, toque no botão abaixo.</p>
        <a className="btn btn--whatsapp btn--block" href={sentUrl} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          <span>Abrir WhatsApp novamente</span>
        </a>
        <button type="button" className="btn btn--outline-dark btn--block" onClick={() => setSentUrl("")}>
          Voltar e ajustar pedido
        </button>
        <button type="button" className="link-btn link-btn--center" onClick={onClear}>
          Já enviei, esvaziar carrinho
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="checkout" onSubmit={submit} noValidate>
      <div className="drawer__body">
        {!whatsappReady && (
          <p className="notice notice--warn" role="alert">{store.messages.whatsappMissing}</p>
        )}
        {MODES.length === 0 && (
          <p className="notice notice--warn" role="alert">Nenhuma modalidade de atendimento está habilitada na loja.</p>
        )}

        {MODES.length > 0 && (
          <fieldset className="field-group">
            <legend>Como você quer receber?</legend>
            {MODES.map((m) => (
              <label key={m.id} className="option">
                <input type="radio" name="mode" value={m.id} checked={mode === m.id} onChange={() => setMode(m.id)} />
                <span className="option__label">
                  {m.label}
                  {m.hint && <span className="option__hint">{m.hint}</span>}
                </span>
              </label>
            ))}
          </fieldset>
        )}

        <Field id="name" label="Seu nome" error={errors.name}>
          <input type="text" autoComplete="name" {...props("name")} />
        </Field>

        {mode === "delivery" && (
          <>
            <Field id="street" label="Rua" error={errors.street}>
              <input type="text" autoComplete="address-line1" {...props("street")} />
            </Field>
            <div className="field-row">
              <Field id="number" label="Número" error={errors.number}>
                <input type="text" inputMode="text" {...props("number")} />
              </Field>
              <Field id="district" label="Bairro" error={errors.district}>
                <input type="text" {...props("district")} />
              </Field>
            </div>
            <Field id="reference" label="Ponto de referência" optional>
              <input type="text" {...props("reference")} />
            </Field>
            {store.ordering.delivery.area && (
              <p className="field__help">Área de entrega: {store.ordering.delivery.area}.</p>
            )}
          </>
        )}

        {paymentOptions.length > 0 && mode && (
          <Field id="payment" label={`Forma de pagamento na ${mode === "delivery" ? "entrega" : "retirada"}`} optional>
            <select {...props("payment")}>
              <option value="">Combino pelo WhatsApp</option>
              {paymentOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
        )}

        <Field id="notes" label="Observações gerais do pedido" optional>
          <textarea rows={2} maxLength={200} {...props("notes")} />
        </Field>

        <section className="review" aria-labelledby="review-title">
          <h3 id="review-title">Revise seu pedido</h3>
          <ul className="review__list">
            {lines.map((l) => (
              <li key={l.key}>
                <span>
                  {l.qty}x {l.product.name}
                  {l.size ? ` (${l.size.label})` : ""}
                  {l.addons.length > 0 && <small>{l.addons.map((a) => `+ ${a.name}`).join(", ")}</small>}
                  {l.note && <small>Obs.: {l.note}</small>}
                </span>
                <span>{formatCurrency(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="totals">
            <div className="totals__row"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
            {mode === "delivery" && (
              <div className="totals__row">
                <span>Taxa de entrega</span>
                <span>
                  {totals.feeToBeInformed ? "a informar pela loja" : totals.deliveryFee ? formatCurrency(totals.deliveryFee) : "Grátis"}
                </span>
              </div>
            )}
            <div className="totals__row totals__row--total">
              <span>Total{totals.feeToBeInformed ? " (sem entrega)" : ""}</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>
          </div>
        </section>
      </div>

      <footer className="drawer__foot">
        {belowMinimum && (
          <p className="notice notice--warn" role="alert">Pedido mínimo: {formatCurrency(minimumOrder)}.</p>
        )}
        <button type="submit" className="btn btn--whatsapp btn--block" disabled={cannotOrder}>
          <WhatsAppIcon />
          <span>Enviar pedido pelo WhatsApp</span>
        </button>
        <p className="foot-note">Você vai revisar e enviar a mensagem dentro do WhatsApp. O pagamento é feito na {mode === "pickup" ? "retirada" : "entrega"}.</p>
        <button type="button" className="link-btn link-btn--center" onClick={onBack}>Voltar ao carrinho</button>
      </footer>
    </form>
  );
}
