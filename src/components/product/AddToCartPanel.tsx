"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { useCart } from "@/context/CartContext";
import { CartIcon, CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";

export function AddToCartPanel({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  const disabled = product.stock === "out-of-stock";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-xl border border-gray-200">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="p-3 text-gray-500 transition hover:text-gray-900 disabled:opacity-40"
          disabled={qty <= 1}
          aria-label="Decrease quantity"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="w-10 text-center font-bold text-gray-900">{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="p-3 text-gray-500 transition hover:text-gray-900"
          aria-label="Increase quantity"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={disabled}
        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition active:scale-95 sm:flex-none ${
          added
            ? "bg-green-600 shadow-green-600/30"
            : "bg-primary shadow-primary/30 hover:bg-primary-dark"
        } disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none`}
      >
        {added ? <CheckIcon className="h-5 w-5" /> : <CartIcon className="h-5 w-5" />}
        {added ? "Added To Cart" : "Add To Cart"}
      </button>

      <button
        onClick={() => {
          addItem(product, qty);
          openCart();
        }}
        disabled={disabled}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-900 px-6 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white active:scale-95 sm:flex-none disabled:cursor-not-allowed disabled:opacity-40"
      >
        Buy Now
      </button>
    </div>
  );
}
