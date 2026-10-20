import Link from "next/link";
import type { Product } from "@/data/types";
import { brandMap } from "@/data/brands";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { formatCount, formatPrice } from "@/lib/utils";
import { StarIcon } from "@/components/icons";

function RatingStars({ rating }: { rating?: number }) {
  if (!rating) return null;
  const full = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-3.5 w-3.5 ${i < full ? "text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </span>
  );
}

function StockLabel({ product }: { product: Product }) {
  if (product.stock === "out-of-stock") {
    return <span className="text-xs font-semibold text-red-600">Out Of Stock</span>;
  }
  if (product.stock === "low-stock") {
    return <span className="text-xs font-semibold text-amber-600">Only Few Left</span>;
  }
  return <span className="text-xs font-semibold text-green-600">In Stock</span>;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const brand = brandMap[product.brand];
  const mrp = product.mrp ?? product.price;
  const off = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/60">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden">
        <span
          className="absolute left-0 right-0 top-0 z-10 h-1.5"
          style={{ backgroundColor: brand.color }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          loading={index < 4 ? "eager" : "lazy"}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-5 flex flex-col gap-1.5">
          {off > 0 && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-white shadow">
              {off}% Off
            </span>
          )}
          {product.badge && (
            <span className="rounded-md bg-gray-900/85 px-2 py-0.5 text-[11px] font-bold text-white shadow">
              {product.badge}
            </span>
          )}
        </div>
        <span className="absolute bottom-3 right-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider shadow" style={{ color: brand.color }}>
          {brand.name}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between">
          <RatingStars rating={product.rating} />
          {product.ratingCount ? (
            <span className="text-xs text-gray-400">({formatCount(product.ratingCount)})</span>
          ) : null}
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug text-gray-900 transition hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="line-clamp-1 text-xs text-gray-500">
          {product.applicability[0]?.model ?? "Universal"}
        </p>
        <div className="mt-auto flex items-end justify-between pt-1">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-primary">{formatPrice(product.price)}</span>
              {mrp > product.price && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(mrp)}</span>
              )}
            </div>
            <StockLabel product={product} />
          </div>
        </div>
        <div className="mt-2.5">
          <AddToCartButton
            product={product}
            size="sm"
            disabled={product.stock === "out-of-stock"}
            label={product.stock === "out-of-stock" ? "Out Of Stock" : undefined}
          />
        </div>
      </div>
    </div>
  );
}
