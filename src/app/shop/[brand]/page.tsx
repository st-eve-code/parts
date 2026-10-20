import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brands, getBrand } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { ChevronRightIcon, SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface BrandParams {
  brand: string;
}

export function generateStaticParams(): BrandParams[] {
  return brands.map((brand) => ({ brand: brand.id }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[brand]">): Promise<Metadata> {
  const { brand: id } = await params;
  const brand = getBrand(id);
  if (!brand) return {};
  return {
    title: `${brand.name} Spare Parts`,
    description: brand.description,
  };
}

export default async function BrandPage({ params }: PageProps<"/shop/[brand]">) {
  const { brand: id } = await params;
  const brand = getBrand(id);
  if (!brand) notFound();

  const list = getProductsByBrand(brand.id);
  const categories = Array.from(new Set(list.map((p) => p.category)));

  return (
    <div className="bg-gray-50">
      <section className="bg-gray-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <ChevronRightIcon className="h-3.5 w-3.5" />
            <Link href="/shop" className="transition hover:text-white">Shop</Link>
            <ChevronRightIcon className="h-3.5 w-3.5" />
            <span className="font-semibold text-white">{brand.name}</span>
          </nav>
          <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="w-44 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.image}
                alt={`${brand.name} logo`}
                width={320}
                height={208}
                className="w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: brand.color }}>
                {brand.tagline}
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
                {brand.name} Spare Parts
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">
                {brand.description}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Popular Models
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {brand.models.slice(0, 14).map((model) => (
                <Link
                  key={model}
                  href={`/shop?brand=${brand.id}&q=${encodeURIComponent(model)}`}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gray-300 transition hover:border-white hover:text-white"
                >
                  {model}
                </Link>
              ))}
              <Link
                href={`/shop?brand=${brand.id}`}
                className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-primary-dark"
              >
                View All {brand.name} Parts ({list.length})
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-900">
            {list.length} Parts Available
          </h2>
          <Link
            href={`/shop?brand=${brand.id}`}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-primary hover:text-primary"
          >
            <SearchIcon className="h-4 w-4" />
            Advanced Search &amp; Filters
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/shop?brand=${brand.id}&category=${category}`}
              className={cn(
                "rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:border-primary hover:text-primary",
              )}
            >
              {category.replace(/-/g, " ")}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
