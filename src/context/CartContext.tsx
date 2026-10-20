"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/data/types";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "autospares-cart";
const serverSnapshot: CartItem[] = [];

let cachedItems: CartItem[] = [];
let initialized = false;
const listeners = new Set<() => void>();

function readCache(): CartItem[] {
  if (!initialized) {
    initialized = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      cachedItems = [];
    }
  }
  return cachedItems;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

function persist(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, readCache, () => serverSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, qty = 1) => {
    cachedItems = (() => {
      const existing = cachedItems.find((i) => i.product.slug === product.slug);
      if (existing) {
        return cachedItems.map((i) =>
          i.product.slug === product.slug ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...cachedItems, { product, qty }];
    })();
    persist(cachedItems);
    notify();
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string) => {
    cachedItems = cachedItems.filter((i) => i.product.slug !== slug);
    persist(cachedItems);
    notify();
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    cachedItems =
      qty <= 0
        ? cachedItems.filter((i) => i.product.slug !== slug)
        : cachedItems.map((i) => (i.product.slug === slug ? { ...i, qty } : i));
    persist(cachedItems);
    notify();
  }, []);

  const clearCart = useCallback(() => {
    cachedItems = [];
    persist(cachedItems);
    notify();
  }, []);

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.count += item.qty;
        acc.subtotal += item.qty * item.product.price;
        return acc;
      },
      { count: 0, subtotal: 0 },
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQty,
      clearCart,
    }),
    [items, count, subtotal, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
