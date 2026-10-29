import store from "../config/store.js";
import { hasAddress } from "./googleMaps.js";
import { instagramUrl, normalizeWhatsapp } from "./links.js";

/** A seção "Sobre" só aparece se houver texto ou diferenciais configurados. */
export const hasAboutSection = () =>
  Boolean(store.about.text?.trim()) || (store.about.highlights?.length ?? 0) > 0;

/** A seção "Contato" só aparece se houver ao menos um canal de contato configurado. */
export const hasContactSection = () =>
  hasAddress(store.address) ||
  Boolean(normalizeWhatsapp(store.whatsapp)) ||
  Boolean(instagramUrl(store.instagram)) ||
  Boolean(store.email?.trim());
