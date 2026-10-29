import store from "../config/store.js";
import InstagramLink from "./InstagramLink.jsx";

export default function Hero() {
  return (
    <section id="inicio" className="hero on-dark" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">{store.name}</h1>
          {store.slogan && <p className="hero__slogan">{store.slogan}</p>}
          {store.description && <p className="hero__text">{store.description}</p>}
          <div className="hero__actions">
            <a className="btn btn--solid" href="#cardapio">{store.messages.heroPrimaryButton}</a>
            <InstagramLink variant="outline" />
          </div>
        </div>

        {store.heroImage && (
          <figure className="hero__figure">
            <img
              className="hero__image"
              src={store.heroImage}
              alt={`Hambúrguer de ${store.name}`}
              width="720"
              height="1280"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        )}
      </div>
    </section>
  );
}
