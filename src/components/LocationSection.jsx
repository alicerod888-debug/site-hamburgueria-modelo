import store from "../config/store.js";
import { formatAddress, hasAddress, mapsEmbedUrl, mapsSearchUrl } from "../utils/googleMaps.js";
import { instagramUrl, whatsappChatUrl } from "../utils/links.js";
import InstagramLink from "./InstagramLink.jsx";
import { MailIcon, PinIcon } from "./Icons.jsx";
import { hasContactSection } from "../utils/siteSections.js";
import WhatsAppButton from "./WhatsAppButton.jsx";

/** Seção "Contato": endereço com Google Maps, WhatsApp, Instagram e e-mail (cada item só aparece se configurado). */
export default function LocationSection() {
  const { address, email, messages } = store;
  const withAddress = hasAddress(address);
  const whatsappUrl = whatsappChatUrl(store.whatsapp);
  const hasInstagram = Boolean(instagramUrl(store.instagram));
  if (!hasContactSection()) return null;

  const mapsUrl = mapsSearchUrl(address);
  const embedUrl = address.showEmbeddedMap ? mapsEmbedUrl(address) : "";

  return (
    <section id="contato" className="section section--white" aria-labelledby="contact-title">
      <div className="container contact">
        <div className="contact__info">
          <h2 id="contact-title" className="section__title">{withAddress ? messages.locationTitle : messages.contactTitle}</h2>

          {withAddress && (
            <p className="contact__address">
              <PinIcon aria-hidden="true" />
              <span>{formatAddress(address)}</span>
            </p>
          )}

          <div className="contact__actions">
            {withAddress && (
              <a className="btn btn--dark" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <PinIcon />
                <span>Como chegar</span>
              </a>
            )}
            <WhatsAppButton href={whatsappUrl} variant="whatsapp" />
            <InstagramLink variant="outline-dark" />
            {email && (
              <a className="btn btn--outline-dark" href={`mailto:${email}`}>
                <MailIcon />
                <span>{email}</span>
              </a>
            )}
          </div>

          {hasInstagram && <p className="contact__call">{messages.instagramCall}</p>}
        </div>

        {embedUrl && (
          <div className="contact__map">
            <iframe
              title={`Mapa com a localização de ${store.name}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
