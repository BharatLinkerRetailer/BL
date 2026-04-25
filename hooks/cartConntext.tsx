// ─── context/CartContext.tsx ────────────────────────────────────────────────

import React, { createContext, useContext, useState, useCallback } from "react";

interface CartState {
  [productId: string]: number;
}

interface CartContextValue {
  cart:           CartState;
  totalItems:     number;
  addToCart:      (id: string) => void;
  removeFromCart: (id: string) => void;
  getQty:         (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});

  const addToCart = useCallback((id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      next[id] > 1 ? (next[id] -= 1) : delete next[id];
      return next;
    });
  }, []);

  const getQty = useCallback((id: string) => cart[id] ?? 0, [cart]);

  const totalItems = Object.values(cart).reduce((sum, n) => sum + n, 0);

  return (
    <CartContext.Provider value={{ cart, totalItems, addToCart, removeFromCart, getQty }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}