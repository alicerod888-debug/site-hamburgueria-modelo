/**
 * PRODUTOS DO CARDÁPIO
 *
 * ATENÇÃO: os produtos e preços abaixo são EXEMPLOS para demonstrar o funcionamento.
 * Substitua pelos itens reais do cliente antes de publicar.
 *
 * Campos:
 *  id           identificador único (minúsculas, hífen, sem acentos)
 *  name         nome exibido
 *  description  descrição curta
 *  price        preço em reais (número, ex.: 29.9). Obrigatório quando não há "sizes"
 *  image        caminho da foto. Ex.: "/assets/images/products/classico.jpg"
 *               (arquivo em public/assets/images/products/). Vazio = imagem "Foto em breve"
 *  category     id de uma categoria de categories.js
 *  available    false = aparece desabilitado e não pode ser pedido
 *  featured     true = aparece na seção de destaques
 *  sizes        (opcional) [{ id, label, price }] -> o cliente escolhe um tamanho; o preço do tamanho vale no lugar de "price"
 *  addons       (opcional) lista de ids de grupos de addons.js
 */
const products = [
  {
    id: "classico",
    name: "Clássico",
    description: "Pão brioche, hambúrguer bovino, queijo, alface, tomate e molho da casa.",
    price: 28,
    image: "",
    category: "bovinos",
    available: true,
    featured: true,
    addons: ["extras-burger"],
  },
  {
    id: "duplo-cheddar",
    name: "Duplo Cheddar",
    description: "Dois hambúrgueres bovinos, cheddar derretido e cebola caramelizada.",
    price: 36,
    image: "",
    category: "bovinos",
    available: true,
    featured: true,
    addons: ["extras-burger"],
  },
  {
    id: "bacon-bbq",
    name: "Bacon BBQ",
    description: "Hambúrguer bovino, bacon crocante, queijo e molho barbecue.",
    price: 34,
    image: "",
    category: "bovinos",
    available: false,
    addons: ["extras-burger"],
  },
  {
    id: "frango-crocante",
    name: "Frango Crocante",
    description: "Filé de frango empanado, queijo, alface e maionese temperada.",
    price: 27,
    image: "",
    category: "frango",
    available: true,
    addons: ["extras-burger"],
  },
  {
    id: "burger-do-chef",
    name: "Burger do Chef",
    description: "Receita especial da casa. Descreva aqui os ingredientes principais.",
    price: 42,
    image: "",
    category: "especiais",
    available: true,
    featured: true,
    addons: ["extras-burger"],
  },
  {
    id: "combo-classico",
    name: "Combo Clássico",
    description: "Clássico, batata frita e refrigerante lata.",
    price: 42,
    image: "",
    category: "combos",
    available: true,
  },
  {
    id: "batata-frita",
    name: "Batata frita",
    description: "Porção crocante, servida quente.",
    image: "",
    category: "acompanhamentos",
    available: true,
    sizes: [
      { id: "p", label: "Pequena", price: 12 },
      { id: "g", label: "Grande", price: 20 },
    ],
    addons: ["extras-batata"],
  },
  {
    id: "refrigerante-lata",
    name: "Refrigerante lata",
    description: "350 ml. Informe o sabor nas observações.",
    price: 6,
    image: "",
    category: "bebidas",
    available: true,
  },
  {
    id: "suco-natural",
    name: "Suco natural",
    description: "Preparado na hora. Informe o sabor nas observações.",
    image: "",
    category: "bebidas",
    available: true,
    sizes: [
      { id: "300", label: "300 ml", price: 8 },
      { id: "500", label: "500 ml", price: 12 },
    ],
  },
  {
    id: "brownie",
    name: "Brownie",
    description: "Brownie de chocolate com cobertura.",
    price: 14,
    image: "",
    category: "sobremesas",
    available: true,
  },
];

export default products;
