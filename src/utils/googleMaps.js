/** Monta o endereço em uma linha. Retorna "" se não houver rua ou cidade suficientes. */
export function formatAddress(address = {}) {
  const parts = [
    address.street,
    address.district,
    [address.city, address.state].filter(Boolean).join(" - "),
    address.zip,
  ]
    .map((p) => (p ?? "").trim())
    .filter(Boolean);
  return parts.join(", ");
}

export function hasAddress(address = {}) {
  return Boolean((address.street ?? "").trim() || (address.city ?? "").trim());
}

/** URL de pesquisa do Google Maps (abre o app no celular). */
export function mapsSearchUrl(address) {
  if (!hasAddress(address)) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(address))}`;
}

/** URL do mapa incorporado (não exige chave de API). */
export function mapsEmbedUrl(address) {
  if (!hasAddress(address)) return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(formatAddress(address))}&output=embed`;
}
