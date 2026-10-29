import { useMemo, useState } from "react";
import store from "../config/store.js";
import categories from "../data/categories.js";
import products from "../data/products.js";
import CategoryNavigation from "./CategoryNavigation.jsx";
import ProductGrid from "./ProductGrid.jsx";

/** Agrupa os produtos pela ordem das categorias; categorias vazias são ignoradas. */
function buildGroups() {
  const known = new Set(categories.map((c) => c.id));
  if (import.meta.env?.DEV) {
    products
      .filter((p) => !known.has(p.category))
      .forEach((p) => console.warn(`[cardápio] O produto "${p.id}" usa a categoria "${p.category}", que não existe em categories.js.`));
  }
  return categories
    .map((category) => ({ category, items: products.filter((p) => p.category === category.id) }))
    .filter((group) => group.items.length > 0);
}

export default function MenuSection({ onSelect }) {
  const allGroups = useMemo(buildGroups, []);
  const [active, setActive] = useState("all");

  const visible = active === "all" ? allGroups : allGroups.filter((g) => g.category.id === active);

  return (
    <section id="cardapio" className="section section--paper menu" aria-labelledby="menu-title">
      <div className="container menu__head">
        <h2 id="menu-title" className="section__title">{store.messages.menuTitle}</h2>
        {store.messages.menuSubtitle && <p className="section__lead">{store.messages.menuSubtitle}</p>}
      </div>

      {allGroups.length > 1 && (
        <CategoryNavigation categories={allGroups.map((g) => g.category)} active={active} onChange={setActive} />
      )}

      <div className="container">
        <ProductGrid groups={visible} onSelect={onSelect} />
      </div>
    </section>
  );
}
