import { useEffect, useState } from "react";
import store from "../config/store.js";
import { CartIcon, CloseIcon, MenuIcon } from "./Icons.jsx";

export default function Header({ links, itemCount, onOpenCart }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled || open ? "header--solid" : ""}`}>
      <div className="container header__bar">
        <a className="brand" href="#inicio" onClick={() => setOpen(false)} aria-label={`${store.name}, ir para o início`}>
          {store.logo ? (
            <img className="brand__logo" src={store.logo} alt={store.name} />
          ) : (
            <span className="brand__name">{store.name}</span>
          )}
        </a>

        <nav id="main-nav" className={`nav ${open ? "nav--open" : ""}`} aria-label="Principal">
          <ul className="nav__list">
            {links.map((link) => (
              <li key={link.href}>
                <a className="nav__link" href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="btn btn--solid btn--sm header__cta" href="#cardapio">
            {store.messages.orderButton}
          </a>
          <button type="button" className="icon-btn" onClick={onOpenCart} aria-label={`Abrir carrinho, ${itemCount} ${itemCount === 1 ? "item" : "itens"}`}>
            <CartIcon />
            {itemCount > 0 && <span className="badge" aria-hidden="true">{itemCount}</span>}
          </button>
          <button
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
