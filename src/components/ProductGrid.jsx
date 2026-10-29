import ProductCard from "./ProductCard.jsx";

/** Lista de produtos agrupados por categoria (ou de uma só categoria quando filtrado). */
export default function ProductGrid({ groups, onSelect }) {
  if (!groups.length) {
    return <p className="empty">Nenhum produto cadastrado nesta categoria.</p>;
  }

  return (
    <div className="menu-groups">
      {groups.map(({ category, items }) => (
        <section key={category.id} className="menu-group" aria-labelledby={`cat-${category.id}`}>
          <h3 id={`cat-${category.id}`} className="menu-group__title">{category.name}</h3>
          {category.description && <p className="menu-group__text">{category.description}</p>}
          <div className="grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} onSelect={onSelect} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
