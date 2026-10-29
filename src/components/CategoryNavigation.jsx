/** Filtros por categoria. "Todos" mostra o cardápio completo agrupado. */
export default function CategoryNavigation({ categories, active, onChange }) {
  const items = [{ id: "all", name: "Todos" }, ...categories];

  return (
    <nav className="catnav" aria-label="Categorias do cardápio">
      <div className="container">
        <ul className="catnav__list">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="chip"
                aria-pressed={active === item.id}
                onClick={() => onChange(item.id)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
