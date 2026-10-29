import { useMemo, useState } from "react";
import useDialog from "../hooks/useDialog.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import { PLACEHOLDER_IMAGE } from "../utils/images.js";
import { getAddonGroups } from "../utils/pricing.js";
import { CloseIcon, MinusIcon, PlusIcon } from "./Icons.jsx";

const NOTE_LIMIT = 140;

export default function ProductModal({ product, onClose, onAdd }) {
  const dialogRef = useDialog(true, onClose);
  const groups = useMemo(() => getAddonGroups(product), [product]);
  const [sizeId, setSizeId] = useState(product.sizes?.[0]?.id ?? null);
  const [selected, setSelected] = useState({}); // { groupId: Set(itemId) }
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [imgSrc, setImgSrc] = useState(product.image || PLACEHOLDER_IMAGE);

  const size = product.sizes?.find((s) => s.id === sizeId);
  const base = size ? size.price : product.price ?? 0;
  const addonIds = groups.flatMap((g) => [...(selected[g.id] ?? [])]);
  const addonsTotal = groups.reduce(
    (sum, g) => sum + g.items.filter((i) => selected[g.id]?.has(i.id)).reduce((s, i) => s + i.price, 0),
    0,
  );
  const unit = base + addonsTotal;

  const toggleAddon = (group, itemId) => {
    setSelected((prev) => {
      const next = new Set(prev[group.id] ?? []);
      if (next.has(itemId)) next.delete(itemId);
      else if (!group.max || next.size < group.max) next.add(itemId);
      return { ...prev, [group.id]: next };
    });
  };

  const submit = (event) => {
    event.preventDefault();
    onAdd({ productId: product.id, sizeId, addonIds, qty, note: note.trim() });
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="sheet" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button type="button" className="icon-btn sheet__close" onClick={onClose} aria-label="Fechar">
          <CloseIcon />
        </button>

        <form onSubmit={submit} className="sheet__form">
          <div className="sheet__scroll">
            <img
              className="sheet__image"
              src={imgSrc}
              alt={product.image ? product.name : ""}
              onError={() => imgSrc !== PLACEHOLDER_IMAGE && setImgSrc(PLACEHOLDER_IMAGE)}
            />

            <div className="sheet__content">
              <h2 id="modal-title" className="sheet__title">{product.name}</h2>
              {product.description && <p className="sheet__text">{product.description}</p>}

              {product.sizes?.length > 0 && (
                <fieldset className="field-group">
                  <legend>Tamanho</legend>
                  {product.sizes.map((s) => (
                    <label key={s.id} className="option">
                      <input type="radio" name="size" value={s.id} checked={sizeId === s.id} onChange={() => setSizeId(s.id)} />
                      <span className="option__label">{s.label}</span>
                      <span className="option__price">{formatCurrency(s.price)}</span>
                    </label>
                  ))}
                </fieldset>
              )}

              {groups.map((group) => {
                const count = selected[group.id]?.size ?? 0;
                return (
                  <fieldset key={group.id} className="field-group">
                    <legend>
                      {group.label}
                      {group.max ? <span className="field-group__hint"> (até {group.max})</span> : null}
                    </legend>
                    {group.items.map((item) => {
                      const checked = selected[group.id]?.has(item.id) ?? false;
                      const blocked = !checked && group.max && count >= group.max;
                      return (
                        <label key={item.id} className={`option ${blocked ? "option--disabled" : ""}`}>
                          <input type="checkbox" checked={checked} disabled={Boolean(blocked)} onChange={() => toggleAddon(group, item.id)} />
                          <span className="option__label">{item.name}</span>
                          <span className="option__price">{item.price ? `+ ${formatCurrency(item.price)}` : "Grátis"}</span>
                        </label>
                      );
                    })}
                  </fieldset>
                );
              })}

              <div className="field">
                <label htmlFor="item-note">Observações do item <span className="field-group__hint">(opcional)</span></label>
                <textarea
                  id="item-note"
                  rows={2}
                  maxLength={NOTE_LIMIT}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ex.: sem cebola, ponto da carne, sabor da bebida"
                />
              </div>
            </div>
          </div>

          <div className="sheet__footer">
            <div className="stepper" role="group" aria-label="Quantidade">
              <button type="button" className="icon-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade" disabled={qty <= 1}>
                <MinusIcon />
              </button>
              <output aria-live="polite">{qty}</output>
              <button type="button" className="icon-btn" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Aumentar quantidade">
                <PlusIcon />
              </button>
            </div>
            <button type="submit" className="btn btn--solid sheet__submit">
              Adicionar {formatCurrency(unit * qty)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
