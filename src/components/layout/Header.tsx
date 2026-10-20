"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/context/CartContext";
import { brands } from "@/data/brands";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  CartIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/icons";

export function Header() {
  const { count, openCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-gray-900 text-center text-xs font-medium tracking-wide text-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-2">
          Free shipping across India on orders above {site.currency}
          {site.freeShippingThreshold} • 100% genuine parts guaranteed
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <button
            className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-black text-white shadow-lg shadow-primary/30">
              AS
            </span>
            <span className="hidden sm:block">
              <span className="block text-lg font-extrabold leading-none tracking-tight text-gray-900">
                {site.shortName}
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-primary">
                Genuine Spare Parts
              </span>
            </span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="ml-auto hidden flex-1 max-w-xl items-center lg:flex"
            role="search"
          >
            <div className="flex w-full overflow-hidden rounded-xl border-2 border-gray-200 transition focus-within:border-primary">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your part, e.g. Piston, Brake Pad, Mirror..."
                className="w-full px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <SearchIcon className="h-4 w-4" />
                Search
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <div className="relative">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <UserIcon className="h-5 w-5" />
                <span className="hidden xl:block">
                  Hello, Sign In
                </span>
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
                  <p className="text-sm font-semibold text-gray-900">Welcome to {site.name}</p>
                  <p className="mt-1 text-xs text-gray-500">Get access to orders &amp; recommendations.</p>
                  <Link
                    href="/contact"
                    onClick={() => setAccountOpen(false)}
                    className="mt-3 block rounded-lg bg-gray-900 py-2 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Contact Support
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              aria-label="Open cart"
            >
              <CartIcon className="h-5 w-5" />
              <span className="hidden xl:block">Cart</span>
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-gray-900">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex items-center gap-1 whitespace-nowrap py-2.5">
            {brands.map((brand) => {
              const href = `/shop/${brand.id}`;
              const active = pathname === href;
              return (
                <li key={brand.id}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition",
                      active
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {brand.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition",
                  pathname === "/shop" || pathname.startsWith("/product")
                    ? "bg-white text-gray-900"
                    : "text-white hover:bg-white/10",
                )}
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <form onSubmit={handleSearch} className="border-b border-gray-100 p-3">
            <div className="flex overflow-hidden rounded-xl border-2 border-gray-200 focus-within:border-primary">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search parts..."
                className="w-full px-3 py-2 text-sm outline-none"
                aria-label="Search products"
              />
              <button type="submit" className="bg-gray-900 px-4 text-white" aria-label="Search">
                <SearchIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
          <ul className="grid grid-cols-2 gap-1 p-3">
            <li className="col-span-2">
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-bold text-white"
              >
                Shop All Parts
              </Link>
            </li>
            {brands.map((brand) => (
              <li key={brand.id}>
                <Link
                  href={`/shop/${brand.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
                >
                  {brand.name}
                </Link>
              </li>
            ))}
            <li className="col-span-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-100"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
