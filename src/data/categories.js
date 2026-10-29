/**
 * CATEGORIAS DO CARDÁPIO
 * - A ORDEM desta lista é a ordem exibida no site.
 * - Para criar: adicione um item. Para excluir: apague o item. Para renomear: altere "name".
 * - "id" é usado em products.js (campo "category"). Use letras minúsculas e hífen, sem acentos.
 * - Categorias sem produtos não aparecem no site.
 */
const categories = [
  { id: "bovinos", name: "Hambúrgueres bovinos" },
  { id: "frango", name: "Hambúrgueres de frango" },
  { id: "especiais", name: "Especiais" },
  { id: "combos", name: "Combos" },
  { id: "acompanhamentos", name: "Acompanhamentos" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
];

export default categories;
