import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { brands, getBrand } from "@/data/brands";
import { ProductCard } from "@/components/ui/ProductCard";
import { SortSelect } from "@/components/shop/SortSelect";
import { site } from "@/data/site";
import { CloseIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop All Spare Parts",
  description: `Browse 100% genuine two-wheeler spare parts across all brands at ${site.name}.`,
};

const CATEGORY_LABELS: Record<string, string> = {
  piston: "Piston Kits",
  "brake-pads": "Brake Pads",
  "disc-rotor": "Disc Rotors",
  mirror: "Mirrors",
  "clutch-plates": "Clutch Plates",
  "chain-sprocket": "Chain Sprocket",
  cdi: "CDI Units",
  speedometer: "Speedometers",
  roller: "Rollers & Sliders",
  "oil-seal": "Oil Seals",
  "air-filter": "Air Filters",
  indicator: "Indicators",
  lever: "Levers",
  footrest: "Footrests",
  headlight: "Headlights",
  "side-stand": "Side Stands",
  "engine-oil": "Engine Oils",
  "spark-plug": "Spark Plugs",
  battery: "Batteries",
  camshaft: "Camshafts",
  chain: "Chains",
  "brake-shoe": "Brake Shoes",
  cable: "Cables",
  seat: "Seats",
  "engine-guard": "Engine Guards",
  "pannier-rail": "Pannier Rails",
  sealant: "Sealants",
  "sump-guard": "Sump Guards",
  exhaust: "Exhausts",
  fender: "Fenders",
  "fuel-pump": "Fuel Pumps",
};

function titleCase(slug: string): string {
  return CATEGORY_LABELS[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const query = (sp.q ?? "").toString().trim().toLowerCase();
  const brandParam = sp.brand?.toString();
  const categoryParam = sp.category?.toString();
  const sort = sp.sort?.toString() ?? "featured";

  const brand = brandParam ? getBrand(brandParam) : undefined;

  let list = [...products];
  if (brand) {
    list = list.filter((p) => p.brand === brand.id);
  }
  if (categoryParam) {
    list = list.filter((p) => p.category === categoryParam);
  }
  if (query) {
    list = list.filter((p) => {
      const haystack = [
        p.name,
        p.brand,
        ...p.specification,
        ...p.applicability.map((a) => `${a.make} ${a.model} ${a.year}`),
      ]
        .join(" ")
        .toLowerCase();
      return query.split(/\s+/).every((w) => haystack.includes(w));
    });
  }

  switch (sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      list.sort(
        (a, b) =>
          Number(b.featured ?? false) - Number(a.featured ?? false) ||
          (b.rating ?? 0) - (a.rating ?? 0),
      );
  }

  const categories = Array.from(new Set(products.map((p) => p.category))).map((c) => ({
    id: c,
    label: titleCase(c),
    count: products.filter((p) => p.category === c).length,
  }));

  const activeFilters = Boolean(brandParam || categoryParam || query);

  function buildHref(overrides: {
    brand?: string | null;
    category?: string | null;
  }): string {
    const next = new URLSearchParams();
    const brand = overrides.brand !== undefined ? overrides.brand : brandParam;
    const category =
      overrides.category !== undefined ? overrides.category : categoryParam;
    if (brand) next.set("brand", brand);
    if (category) next.set("category", category);
    if (query) next.set("q", sp.q!.toString());
    const qs = next.toString();
    return `/shop${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-primary">Home</Link>
            <ChevronRightIcon className="h-3.5 w-3.5" />
            <span className="font-semibold text-gray-900">Shop</span>
            {brand && (
              <>
                <ChevronRightIcon className="h-3.5 w-3.5" />
                <span className="font-semibold text-gray-900">{brand.name}</span>
              </>
            )}
          </nav>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {brand ? `${brand.name} Spare Parts` : "All Genuine Spare Parts"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {list.length} part{list.length === 1 ? "" : "s"} found
            {query && (
              <>
                {" "}
                for “<span className="font-semibold text-gray-900">{sp.q}</span>”
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-36 lg:h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Filters</h2>
                {activeFilters && (
                  <Link href="/shop" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark">
                    <CloseIcon className="h-3.5 w-3.5" />
                    Clear
                  </Link>
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Brand</p>
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link
                      href={buildHref({ brand: null })}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition hover:bg-gray-100",
                        !brandParam ? "font-bold text-primary" : "text-gray-700",
                      )}
                    >
                      All Brands
                      <span className="text-xs text-gray-400">{products.length}</span>
                    </Link>
                  </li>
                  {brands.map((b) => {
                    const count = products.filter((p) => p.brand === b.id).length;
                    return (
                      <li key={b.id}>
                        <Link
                          href={buildHref({ brand: b.id })}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition hover:bg-gray-100",
                            brandParam === b.id ? "font-bold text-primary" : "text-gray-700",
                          )}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: b.color }} />
                            {b.name}
                          </span>
                          <span className="text-xs text-gray-400">{count}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Category</p>
                <ul className="mt-2 max-h-72 space-y-1 overflow-y-auto pr-1">
                  <li>
                    <Link
                      href={buildHref({ category: null })}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition hover:bg-gray-100",
                        !categoryParam ? "font-bold text-primary" : "text-gray-700",
                      )}
                    >
                      All Categories
                      <span className="text-xs text-gray-400">{products.length}</span>
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={buildHref({ category: c.id })}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition hover:bg-gray-100",
                          categoryParam === c.id ? "font-bold text-primary" : "text-gray-700",
                        )}
                      >
                        {c.label}
                        <span className="text-xs text-gray-400">{c.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="hidden text-sm text-gray-500 sm:block">
                Showing <span className="font-bold text-gray-900">{list.length}</span> of{" "}
                {products.length} parts
              </p>
              <div className="w-56 ml-auto">
                <SortSelect />
              </div>
            </div>

            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
                <h2 className="text-lg font-bold text-gray-900">No parts found</h2>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  We couldn&apos;t find any part matching your filters. Try removing some filters or
                  searching for a different part name.
                </p>
                <Link
                  href="/shop"
                  className="mt-5 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark"
                >
                  View All Parts
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((product, i) => (
                  <ProductCard key={product.slug} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
