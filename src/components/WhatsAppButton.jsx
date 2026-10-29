import { WhatsAppIcon } from "./Icons.jsx";

/** Link para uma conversa no WhatsApp. Não renderiza nada sem href (número não configurado). */
export default function WhatsAppButton({ href, children = "Chamar no WhatsApp", variant = "solid", className = "" }) {
  if (!href) return null;
  return (
    <a
      className={`btn btn--${variant} ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      <span>{children}</span>
    </a>
  );
}
