import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import store from "./src/config/store.js";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Preenche título, descrição e cor do tema no index.html a partir de src/config/store.js,
// para que buscadores e redes sociais leiam os dados do cliente sem executar JavaScript.
function storeHtml() {
  return {
    name: "store-html",
    transformIndexHtml(html) {
      const title = store.seo.title || store.name;
      const description = store.seo.description || store.description;
      return html
        .replaceAll("%STORE_TITLE%", escapeHtml(title))
        .replaceAll("%STORE_DESCRIPTION%", escapeHtml(description))
        .replaceAll("%STORE_NAME%", escapeHtml(store.name))
        .replaceAll("%STORE_LANG%", escapeHtml(store.locale))
        .replaceAll("%STORE_ACCENT%", escapeHtml(store.colors.accent))
        .replaceAll("%STORE_OG_IMAGE%", escapeHtml(store.seo.shareImage || store.heroImage));
    },
  };
}

export default defineConfig({
  plugins: [react(), storeHtml()],
  build: {
    // Os arquivos gerados ficam em /static para não se misturarem com a pasta public/assets
    // (vídeo e imagens do cliente), que recebe cache curto na Vercel.
    assetsDir: "static",
  },
});
