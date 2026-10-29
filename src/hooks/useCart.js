import { useCallback, useEffect, useMemo, useReducer } from "react";
import store from "../config/store.js";
import { resolveLine } from "../utils/pricing.js";

const STORAGE_KEY = `cart:${store.slug}`;

/** Chave única da linha: mesmo produto + tamanho + adicionais + observação = mesma linha. */
export function lineKey({ productId, sizeId, addonIds = [], note = "" }) {
  return [productId, sizeId ?? "", [...addonIds].sort().join("+"), note.trim().toLowerCase()].join("|");
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((r) => r && r.key && r.productId) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const ref = { ...action.ref, key: lineKey(action.ref) };
      const existing = state.find((r) => r.key === ref.key);
      if (existing) {
        return state.map((r) => (r.key === ref.key ? { ...r, qty: Math.min(99, r.qty + ref.qty) } : r));
      }
      return [...state, ref];
    }
    case "setQty": {
      if (action.qty <= 0) return state.filter((r) => r.key !== action.key);
      return state.map((r) => (r.key === action.key ? { ...r, qty: Math.min(99, action.qty) } : r));
    }
    case "remove":
      return state.filter((r) => r.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

export default function useCart() {
  const [refs, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(refs));
    } catch {
      /* armazenamento indisponível (modo privado): o carrinho funciona só na sessão */
    }
  }, [refs]);

  // Recalcula tudo a partir do cardápio atual; itens removidos/indisponíveis saem do carrinho.
  const lines = useMemo(() => refs.map(resolveLine).filter(Boolean), [refs]);
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const add = useCallback((ref) => dispatch({ type: "add", ref }), []);
  const setQty = useCallback((key, qty) => dispatch({ type: "setQty", key, qty }), []);
  const remove = useCallback((key) => dispatch({ type: "remove", key }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  return { lines, itemCount, add, setQty, remove, clear };
}
