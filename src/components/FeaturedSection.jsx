import store from "../config/store.js";
import ProductCard from "./ProductCard.jsx";

export default function FeaturedSection({ products, onSelect }) {
  if (!products.length) return null;
  return (
    <section id="destaques" className="section section--white" aria-labelledby="featured-title">
      <div className="container">
        <h2 id="featured-title" className="section__title">{store.messages.featuredTitle}</h2>
        <div className="grid grid--featured">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  );
}
