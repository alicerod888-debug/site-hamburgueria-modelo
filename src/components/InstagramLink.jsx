import store from "../config/store.js";
import { instagramHandle, instagramUrl } from "../utils/links.js";
import { InstagramIcon } from "./Icons.jsx";

/** Link para o perfil do Instagram. Não renderiza nada se não houver perfil válido configurado. */
export default function InstagramLink({ variant = "ghost", showHandle = true, className = "" }) {
  const href = instagramUrl(store.instagram);
  if (!href) return null;
  const handle = instagramHandle(store.instagram);

  return (
    <a
      className={`btn btn--${variant} ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram ${handle}`}
    >
      <InstagramIcon />
      {showHandle && <span>{handle}</span>}
    </a>
  );
}
