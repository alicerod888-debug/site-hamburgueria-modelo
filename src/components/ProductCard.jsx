import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency.js";
import { PLACEHOLDER_IMAGE } from "../utils/images.js";
import { startingPrice } from "../utils/pricing.js";
import { PlusIcon } from "./Icons.jsx";

export default function ProductCard({ product, onSelect, variant = "default" }) {
  const [src, setSrc] = useState(product.image || PLACEHOLDER_IMAGE);
  const unavailable = product.available === false;
  const hasSizes = Boolean(product.sizes?.length);

  return (
    <article className={`card ${unavailable ? "card--unavailable" : ""} ${variant === "featured" ? "card--featured" : ""}`}>
      <div className="card__media">
        <img
          src={src}
          alt={product.image ? product.name : ""}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
          onError={() => src !== PLACEHOLDER_IMAGE && setSrc(PLACEHOLDER_IMAGE)}
        />
        {unavailable && <span className="card__tag">Indisponível</span>}
      </div>

      <div className="card__body">
        <h3 className="card__title">{product.name}</h3>
        {product.description && <p className="card__text">{product.description}</p>}

        <div className="card__footer">
          <p className="card__price">
            {hasSizes && <span className="card__from">a partir de </span>}
            {formatCurrency(startingPrice(product))}
          </p>
          <button
            type="button"
            className="btn btn--solid btn--sm card__add"
            onClick={() => onSelect(product)}
            disabled={unavailable}
            aria-label={unavailable ? `${product.name}, indisponível` : `Escolher ${product.name}`}
          >
            {unavailable ? (
              "Indisponível"
            ) : (
              <>
                <PlusIcon width={16} height={16} />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
