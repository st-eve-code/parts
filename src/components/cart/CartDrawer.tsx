"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { site } from "@/data/site";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon } from "@/components/icons";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart();

  const shipping = subtotal >= site.freeShippingThreshold || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            My Cart{" "}
            <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
              {items.length} item{items.length === 1 ? "" : "s"}
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close cart"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <TruckIcon className="h-10 w-10" />
            </div>
            <p className="font-medium text-gray-700">Shopping cart is empty!</p>
            <p className="text-sm text-gray-500">
              Add genuine spare parts for your bike and they will show up here.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto px-5">
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="flex gap-4 py-4">
                  <Link href={`/product/${product.slug}`} onClick={closeCart} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      width={76}
                      height={76}
                      className="h-19 w-19 rounded-lg border border-gray-100 object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-medium leading-snug text-gray-900 hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm font-bold text-primary">{formatPrice(product.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() => updateQty(product.slug, qty - 1)}
                          className="p-1.5 text-gray-500 transition hover:text-gray-900"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-gray-900">{qty}</span>
                        <button
                          onClick={() => updateQty(product.slug, qty + 1)}
                          className="p-1.5 text-gray-500 transition hover:text-gray-900"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.slug)}
                        className="text-gray-400 transition hover:text-red-600"
                        aria-label={`Remove ${product.name}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < site.freeShippingThreshold && (
                  <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    Add {formatPrice(site.freeShippingThreshold - subtotal)} more to get FREE shipping.
                  </p>
                )}
                <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 block w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-dark"
              >
                Proceed To Checkout
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 w-full rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
