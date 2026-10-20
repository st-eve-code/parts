"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/types";
import { CartIcon, CheckIcon } from "@/components/icons";
import { useState } from "react";

interface AddToCartButtonProps {
  product: Product;
  qty?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
}

export function AddToCartButton({
  product,
  qty = 1,
  size = "md",
  label = "Add To Cart",
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2",
  };

  function handleClick() {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg bg-primary font-semibold text-white shadow-md shadow-primary/25 transition hover:bg-primary-dark active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none ${sizes[size]} ${
        added ? "bg-green-600 shadow-green-600/25 hover:bg-green-600" : ""
      }`}
      aria-label={`Add ${product.name} to cart`}
    >
      {added ? <CheckIcon className="h-4 w-4" /> : <CartIcon className="h-4 w-4" />}
      {added ? "Added!" : label}
    </button>
  );
}
