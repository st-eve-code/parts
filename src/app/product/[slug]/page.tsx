import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct, getProductsByBrand } from "@/data/products";
import { getBrand } from "@/data/brands";
import { site } from "@/data/site";
import { ProductCard } from "@/components/ui/ProductCard";
import { AddToCartPanel } from "@/components/product/AddToCartPanel";
import { PincodeCheck } from "@/components/product/PincodeCheck";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/gsap/Reveal";
import {
  ChevronRightIcon,
  BoxIcon,
  ShieldCheckIcon,
  TruckIcon,
  BadgeCheckIcon,
  HeadsetIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { formatPrice, discountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductParams {
  slug: string;
}

export function generateStaticParams(): ProductParams[] {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | ${site.name}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const brand = getBrand(product.brand);
  const related = getProductsByBrand(product.brand)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const inStock = product.stock !== "out-of-stock";

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-primary">Home</Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <Link href="/shop" className="transition hover:text-primary">Shop</Link>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          {brand && (
            <>
              <Link href={`/shop?brand=${brand.id}`} className="transition hover:text-primary">
                {brand.name}
              </Link>
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </>
          )}
          <span className="line-clamp-1 font-semibold text-gray-900">{product.name}</span>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-36 lg:h-fit">
            <div
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white"
              style={{
                background: `linear-gradient(145deg, ${brand?.color ?? "#000000"}0d, transparent 55%)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                width={640}
                height={640}
                className="aspect-square w-full object-cover"
              />
              {product.badge && (
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow-lg"
                  style={{ backgroundColor: brand?.color ?? "#000000" }}
                >
                  {product.badge}
                </span>
              )}
              {product.stock === "out-of-stock" && (
                <span className="absolute right-4 top-4 rounded-full bg-gray-900 px-3 py-1 text-xs font-bold text-white">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheckIcon, label: "100% Genuine Parts" },
                { icon: TruckIcon, label: "Fast All-India Delivery" },
                { icon: HeadsetIcon, label: "Expert Support 7 Days" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2 py-3 text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="text-[11px] font-semibold leading-tight text-gray-600">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              {brand ? (
                <Link
                  href={`/shop?brand=${brand.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold shadow-sm ring-1 ring-gray-200 transition hover:ring-primary"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand.color }} />
                  {brand.name}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold shadow-sm ring-1 ring-gray-200">
                  <BoxIcon className="h-3.5 w-3.5 text-primary" />
                  Spare Part
                </span>
              )}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-bold",
                  inStock ? "text-green-600" : "text-red-600",
                )}
              >
                <span className={cn("h-2 w-2 rounded-full", inStock ? "bg-green-500" : "bg-red-500")} />
                {product.stock === "low-stock" ? "Hurry! Only few left" : inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-black leading-snug tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Rating rating={product.rating ?? 0} />
              <span className="text-sm text-gray-500">
                {product.rating?.toFixed(1)} · {product.ratingCount ?? 0} ratings
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-black tracking-tight text-gray-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.mrp ?? product.price)}</span>
              <span className="rounded-md bg-green-100 px-2 py-0.5 text-sm font-bold text-green-700">
                {discountPercent(product.price, product.mrp ?? product.price)}% OFF
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Inclusive of all taxes.</p>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Key Specifications
              </h2>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {[
                  { label: "Category", value: product.category.replace(/-/g, " ").toUpperCase() },
                  ...(product.oem ? [{ label: "OEM Part No.", value: product.oem }] : []),
                  ...(product.specification.slice(0, 2).map((s) => {
                    const [label, ...rest] = s.split(":");
                    return {
                      label: label?.trim(),
                      value: rest.join(":").trim() || s,
                    };
                  })),
                ].map(
                  (row) =>
                    row.label &&
                    row.value && (
                      <div key={row.label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-gray-100 pb-1.5">
                        <dt className="text-xs text-gray-500">{row.label}</dt>
                        <dd className="text-right text-sm font-semibold text-gray-900">{row.value}</dd>
                      </div>
                    ),
                )}
              </dl>

              <div className="mt-5">
                <AddToCartPanel product={product} />
              </div>

              <div className="mt-5">
                <PincodeCheck />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">Description</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-600">{product.description}</p>
            </div>

            {product.applicability.length > 0 && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <h2 className="border-b border-gray-100 px-5 py-4 text-sm font-bold uppercase tracking-wider text-gray-900">
                  Fits These Vehicles
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                        <th className="px-5 py-3">Make</th>
                        <th className="px-5 py-3">Model</th>
                        <th className="px-5 py-3">Year Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.applicability.map((app, i) => (
                        <tr key={i} className={cn("text-gray-700", i % 2 === 0 && "bg-white", i % 2 === 1 && "bg-gray-50/50")}>
                          <td className="px-5 py-3 font-semibold">{app.make}</td>
                          <td className="px-5 py-3">{app.model}</td>
                          <td className="px-5 py-3">{app.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                <BoxIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Return Policy</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    7-day no-questions-asked returns on unused parts. Replacement for damaged goods.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                <BadgeCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Fitment Guarantee</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Not sure it fits? Chat with our mechanics before you order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <Reveal>
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">More Options</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight text-gray-900">
                    {brand ? `${brand.name}` : "More"} Parts You May Need
                  </h2>
                </div>
                <Link
                  href={brand ? `/shop?brand=${brand.id}` : "/shop"}
                  className="hidden items-center gap-1.5 text-sm font-bold text-primary transition hover:gap-2.5 sm:inline-flex"
                >
                  View all <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
