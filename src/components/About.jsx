import store from "../config/store.js";

export default function About() {
  const { text, highlights = [] } = store.about;
  return (
    <section id="sobre" className="section section--graphite on-dark" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__intro">
          <h2 id="about-title" className="section__title">{store.messages.aboutTitle}</h2>
          {text && <p className="about__text">{text}</p>}
        </div>
        {highlights.length > 0 && (
          <ul className="about__list">
            {highlights.map((item) => (
              <li key={item.title} className="about__item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
