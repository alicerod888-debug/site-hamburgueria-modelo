import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import store from "./config/store.js";
import products from "./data/products.js";
import useCart from "./hooks/useCart.js";
import { hasAboutSection, hasContactSection } from "./utils/siteSections.js";
import About from "./components/About.jsx";
import CartBar from "./components/CartBar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import FeaturedSection from "./components/FeaturedSection.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import InfoSection from "./components/InfoSection.jsx";
import IntroVideo from "./components/IntroVideo.jsx";
import LocationSection from "./components/LocationSection.jsx";
import MenuSection from "./components/MenuSection.jsx";
import ProductModal from "./components/ProductModal.jsx";
import Toast from "./components/Toast.jsx";

const INTRO_KEY = `intro-seen:${store.slug}`;

function shouldShowIntro() {
  if (!store.intro.enabled || !store.intro.video) return false;
  if (!store.intro.showOnce) return true;
  try {
    return window.sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return true;
  }
}

export default function App() {
  const cart = useCart();
  const [introOpen, setIntroOpen] = useState(shouldShowIntro);
  const [entering, setEntering] = useState(false);
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);

  // Cores da marca vindas de src/config/store.js
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--accent", store.colors.accent);
    root.setProperty("--accent-text", store.colors.accentText);
    document.title = store.seo.title;
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const links = useMemo(
    () =>
      [
        { href: "#inicio", label: "Início" },
        { href: "#cardapio", label: "Cardápio" },
        hasAboutSection() && { href: "#sobre", label: "Sobre" },
        hasContactSection() && { href: "#contato", label: "Contato" },
      ].filter(Boolean),
    [],
  );

  const featured = useMemo(
    () => products.filter((p) => p.featured && p.available !== false).slice(0, store.featuredLimit),
    [],
  );

  const enterSite = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignora */
    }
    setIntroOpen(false);
    setEntering(true);
    window.scrollTo(0, 0);
  }, []);

  const handleAdd = (ref) => {
    const product = selected;
    cart.add(ref);
    setSelected(null);
    setToast(`${product.name} adicionado ao carrinho`);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  };

  const subtotal = cart.lines.reduce((sum, l) => sum + l.lineTotal, 0);

  return (
    <>
      {introOpen && <IntroVideo onEnter={enterSite} />}

      <div className={`site ${entering ? "site--entering" : ""}`} inert={introOpen || undefined}>
        <a className="skip-link" href="#cardapio">Ir para o cardápio</a>
        <Header links={links} itemCount={cart.itemCount} onOpenCart={() => setCartOpen(true)} />
        <main>
          <Hero />
          <FeaturedSection products={featured} onSelect={setSelected} />
          <MenuSection onSelect={setSelected} />
          {hasAboutSection() && <About />}
          <InfoSection />
          <LocationSection />
        </main>
        <Footer links={links} />
        <CartBar itemCount={cart.itemCount} subtotal={subtotal} onOpen={() => setCartOpen(true)} />
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={handleAdd} />}
      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} />}
      <Toast message={toast} />
    </>
  );
}
