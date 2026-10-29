/**
 * GRUPOS DE ADICIONAIS
 * Cada grupo pode ser usado por vários produtos (campo "addons" em products.js).
 * - "max": limite de itens escolhidos no grupo (opcional).
 * - "price": 0 = sem custo. Valores abaixo são EXEMPLOS.
 */
const addonGroups = {
  "extras-burger": {
    label: "Adicionais",
    items: [
      { id: "queijo", name: "Queijo extra", price: 3 },
      { id: "bacon", name: "Bacon", price: 5 },
      { id: "ovo", name: "Ovo", price: 3 },
      { id: "molho-casa", name: "Molho da casa", price: 2 },
    ],
  },
  "extras-batata": {
    label: "Complementos",
    max: 2,
    items: [
      { id: "cheddar", name: "Cheddar cremoso", price: 4 },
      { id: "bacon-batata", name: "Bacon em cubos", price: 4 },
    ],
  },
};

export default addonGroups;
