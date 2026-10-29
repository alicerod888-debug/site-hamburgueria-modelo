/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DA HAMBURGUERIA
 *  Este é o ÚNICO arquivo que você precisa editar para trocar
 *  nome, contatos, endereço, cores, vídeo e regras de entrega.
 *  Cardápio: src/data/products.js e src/data/categories.js
 * ============================================================
 *
 *  Regras rápidas:
 *  - Campo vazio ("") = recurso desligado. Nenhum link falso é criado.
 *  - Caminhos de imagem/vídeo começam com "/" e apontam para a pasta /public.
 *    Ex.: "/assets/video/hero-burger.mp4" = public/assets/video/hero-burger.mp4
 */

const store = {
  // ---------- Identidade ----------
  name: "Nome da Hamburgueria", // EXEMPLO: troque pelo nome do cliente
  slug: "hamburgueria-modelo", // identificador interno (usado para salvar o carrinho do cliente final)
  slogan: "Seu slogan aqui",
  description:
    "Descreva em duas ou três frases o que torna esta hamburgueria especial: a receita, a origem dos ingredientes, a história da casa.",
  logo: "", // Ex.: "/assets/images/logo.png". Vazio = mostra o nome em texto.
  heroImage: "/assets/images/hero-burger.jpg", // imagem principal (proporção vertical ou quadrada funciona melhor)
  locale: "pt-BR",
  currency: "BRL",

  // ---------- Cores da marca ----------
  // O destaque (accent) é usado em botões e detalhes. O texto sobre ele é escolhido em accentText.
  colors: {
    accent: "#f5a300",
    accentText: "#111111",
  },

  // ---------- Abertura com vídeo ----------
  intro: {
    enabled: true,
    video: "/assets/video/hero-burger.mp4", // para trocar o vídeo, substitua este arquivo (mesmo nome) ou altere o caminho aqui
    poster: "/assets/images/hero-poster.jpg", // imagem exibida enquanto o vídeo carrega ou se ele não puder tocar
    showOnce: true, // true = mostra a abertura só na primeira visita da sessão
    enterOnEnd: false, // true = entra no site automaticamente quando o vídeo terminar
  },

  // ---------- Contato ----------
  // WhatsApp: somente números, com código do país e DDD. Ex. Brasil: "5575999999999"
  // Vazio = o botão de finalizar pedido fica desabilitado com aviso claro.
  whatsapp: "",
  // Instagram: apenas o usuário, sem @ e sem link. Ex.: "minhahamburgueria". Vazio = oculto.
  instagram: "",
  email: "", // opcional

  // ---------- Endereço (Google Maps) ----------
  address: {
    street: "", // Rua e número. Ex.: "Rua das Flores, 123"
    district: "", // Bairro
    city: "",
    state: "", // Sigla. Ex.: "BA"
    zip: "", // CEP (opcional)
    showEmbeddedMap: false, // true = mostra o mapa incorporado do Google
  },

  // ---------- Funcionamento ----------
  // Lista livre, uma linha por faixa. Vazio ([]) = a seção de horários é ocultada.
  schedule: [
    // { label: "Terça a domingo", time: "18h às 23h" },
  ],
  scheduleNote: "", // Ex.: "Fechado às segundas."

  // ---------- Pedidos ----------
  ordering: {
    delivery: {
      enabled: true,
      fee: 0, // número (ex.: 6) | 0 = grátis | null = "taxa informada pelo estabelecimento" (não soma no total)
      freeAbove: null, // ex.: 80 = entrega grátis em pedidos a partir de R$ 80
      estimate: "", // Ex.: "40 a 60 min"
      area: "", // Ex.: "Centro e bairros próximos"
    },
    pickup: {
      enabled: true,
      estimate: "", // Ex.: "20 a 30 min"
    },
    minimumOrder: 0, // 0 = sem pedido mínimo
    // Formas de pagamento oferecidas NA ENTREGA/RETIRADA (o site não processa pagamentos).
    // Lista vazia ([]) = o site não pergunta a forma de pagamento.
    paymentOptions: ["Pix", "Cartão", "Dinheiro"],
  },

  // ---------- Textos do site ----------
  messages: {
    heroPrimaryButton: "Ver cardápio",
    orderButton: "Fazer pedido",
    featuredTitle: "Destaques da casa",
    menuTitle: "Cardápio",
    menuSubtitle: "Escolha seus itens, monte o pedido e finalize pelo WhatsApp.",
    aboutTitle: "Sobre nós",
    infoTitle: "Funcionamento e entrega",
    locationTitle: "Onde estamos",
    contactTitle: "Contato",
    instagramCall: "Acompanhe as novidades e promoções no Instagram.",
    emptyCart: "Seu carrinho está vazio. Escolha algo no cardápio.",
    whatsappMissing:
      "O WhatsApp da loja ainda não foi configurado. Não é possível enviar o pedido por enquanto.",
    whatsappSentNotice:
      "Abrimos o WhatsApp com a mensagem pronta. O pedido só é enviado quando você tocar em enviar dentro do WhatsApp.",
    orderIntro: "Olá! Gostaria de fazer um pedido:", // primeira linha da mensagem enviada
    footerNote: "Pedidos finalizados pelo WhatsApp. Pagamento na entrega ou retirada.",
  },

  // ---------- Sobre ----------
  // Diferenciais exibidos na seção "Sobre". EXEMPLOS: substitua por informações reais do cliente.
  about: {
    text: "",
    highlights: [
      { title: "Diferencial 1", text: "Explique em uma frase o primeiro diferencial da casa." },
      { title: "Diferencial 2", text: "Explique em uma frase o segundo diferencial da casa." },
      { title: "Diferencial 3", text: "Explique em uma frase o terceiro diferencial da casa." },
    ],
  },

  // ---------- Destaques ----------
  featuredLimit: 3, // quantos produtos com featured: true aparecem na seção de destaques

  // ---------- SEO ----------
  seo: {
    title: "", // vazio = usa nome + slogan
    description: "", // vazio = usa a descrição acima
    shareImage: "", // imagem ao compartilhar o link. Vazio = usa heroImage
  },
};

// Valores derivados (não precisa editar)
store.seo.title = store.seo.title || `${store.name} | ${store.slogan}`;
store.seo.description = store.seo.description || store.description;

export default store;
