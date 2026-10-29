/** Apenas dígitos. */
export const onlyDigits = (value = "") => String(value).replace(/\D/g, "");

/** Um número de WhatsApp é válido com 10 a 15 dígitos (padrão internacional, sem + nem espaços). */
export function normalizeWhatsapp(value) {
  const digits = onlyDigits(value);
  return /^\d{10,15}$/.test(digits) ? digits : "";
}

/** Link de conversa simples (sem mensagem). Retorna "" se o número não estiver configurado. */
export function whatsappChatUrl(number, text = "") {
  const digits = normalizeWhatsapp(number);
  if (!digits) return "";
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
}

/** Aceita "usuario", "@usuario" ou URL do perfil. Retorna "" se inválido. */
export function instagramUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const handle = raw
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .split(/[/?#]/)[0];
  return /^[A-Za-z0-9._]{1,30}$/.test(handle) ? `https://www.instagram.com/${handle}/` : "";
}

export function instagramHandle(value) {
  const url = instagramUrl(value);
  return url ? `@${url.split("/")[3]}` : "";
}
