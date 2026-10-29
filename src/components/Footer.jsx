import store from "../config/store.js";
import { formatAddress, hasAddress } from "../utils/googleMaps.js";
import InstagramLink from "./InstagramLink.jsx";
import { normalizeWhatsapp, whatsappChatUrl } from "../utils/links.js";
import WhatsAppButton from "./WhatsAppButton.jsx";

export default function Footer({ links }) {
  const year = new Date().getFullYear();
  const withAddress = hasAddress(store.address);
  const hasWhatsapp = Boolean(normalizeWhatsapp(store.whatsapp));

  return (
    <footer className="footer on-dark">
      <div className="container footer__grid">
        <div>
          <p className="footer__brand">{store.name}</p>
          {store.slogan && <p className="footer__text">{store.slogan}</p>}
          {withAddress && <p className="footer__text">{formatAddress(store.address)}</p>}
        </div>

        <nav aria-label="Rodapé">
          <ul className="footer__links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          {hasWhatsapp && <WhatsAppButton href={whatsappChatUrl(store.whatsapp)} variant="outline" />}
          <InstagramLink variant="outline" />
        </div>
      </div>

      <div className="container footer__bottom">
        <p>{store.messages.footerNote}</p>
        <p>&copy; {year} {store.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
