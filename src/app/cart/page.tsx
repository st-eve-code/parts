"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { site } from "@/data/site";
import {
  ArrowRightIcon,
  CartIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  TrashIcon,
  TruckIcon,
} from "@/components/icons";
import { brandMap } from "@/data/brands";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart();

  const shipping = subtotal >= site.freeShippingThreshold || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;
  const savings = items.reduce(
    (sum, i) => sum + ((i.product.mrp ?? i.product.price) - i.product.price) * i.qty,
    0,
  );

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Shopping Cart</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition hover:text-red-600"
            >
              <TrashIcon className="h-4 w-4" />
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-24 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CartIcon className="h-12 w-12" />
            </div>
            <h2 className="mt-6 text-xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Looks like you haven&apos;t added any spare parts yet. Explore our catalogue of 100%
              genuine parts for all major brands.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark"
            >
              Start Shopping <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
              {items.map(({ product, qty }) => {
                const brand = brandMap[product.brand];
                const mrp = product.mrp ?? product.price;
                return (
                  <li key={product.slug} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <Link href={`/product/${product.slug}`} className="relative block shrink-0 self-start sm:self-center">
                      <span
                        className="absolute inset-x-0 top-0 h-1 rounded-t-xl"
                        style={{ backgroundColor: brand.color }}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-xl border border-gray-100 object-cover"
                      />
                    </Link>

                    <div className="flex-1">
                      <Link
                        href={`/product/${product.slug}`}
                        className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 transition hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {brand.name} · {product.applicability[0]?.model ?? "Universal"}
                      </p>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {mrp > product.price && (
                          <span className="text-xs text-gray-400 line-through">{formatPrice(mrp)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() => updateQty(product.slug, qty - 1)}
                          className="p-2 text-gray-500 transition hover:text-gray-900"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">{qty}</span>
                        <button
                          onClick={() => updateQty(product.slug, qty + 1)}
                          className="p-2 text-gray-500 transition hover:text-gray-900"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.slug)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 transition hover:text-red-600"
                        aria-label={`Remove ${product.name}`}
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 lg:sticky lg:top-36">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Price Details
              </h2>
              <dl className="mt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal ({items.length} item{items.length === 1 ? "" : "s"})</dt>
                  <dd className="font-medium text-gray-900">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd className={shipping === 0 ? "font-bold text-green-600" : "font-medium text-gray-900"}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </dd>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <dt>Total Savings</dt>
                    <dd className="font-semibold">{formatPrice(savings)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-black text-gray-900">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>

              {subtotal < site.freeShippingThreshold ? (
                <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
                  <TruckIcon className="mr-1 inline h-3.5 w-3.5" />
                  Add {formatPrice(site.freeShippingThreshold - subtotal)} more to unlock FREE delivery.
                </p>
              ) : (
                <p className="mt-4 flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2.5 text-xs font-semibold text-green-700">
                  <TruckIcon className="h-3.5 w-3.5" />
                  You have unlocked FREE delivery!
                </p>
              )}

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark">
                Proceed To Checkout <ArrowRightIcon className="h-4 w-4" />
              </button>

              <ul className="mt-4 space-y-2 text-xs text-gray-500">
                <li className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 shrink-0 text-primary" />
                  100% genuine parts, sourced directly
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 shrink-0 text-primary" />
                  EMI &amp; UPI available at checkout
                </li>
                <li className="flex items-center gap-2">
                  <TruckIcon className="h-4 w-4 shrink-0 text-primary" />
                  7-day easy returns &amp; replacement
                </li>
              </ul>

              <Link
                href="/shop"
                className="mt-4 block text-center text-xs font-semibold text-gray-500 underline-offset-2 transition hover:text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
