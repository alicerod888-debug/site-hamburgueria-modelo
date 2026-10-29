import store from "../config/store.js";

const formatter = new Intl.NumberFormat(store.locale, {
  style: "currency",
  currency: store.currency,
});

export function formatCurrency(value) {
  return formatter.format(Number.isFinite(value) ? value : 0);
}
