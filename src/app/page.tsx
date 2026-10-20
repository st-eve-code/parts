import { Hero } from "@/components/home/Hero";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { CategoryBanners } from "@/components/home/CategoryBanners";
import { FeaturedProducts, TravelEssentials } from "@/components/home/FeaturedProducts";
import { TrustFeatures } from "@/components/home/TrustFeatures";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/gsap/Reveal";

export default function HomePage() {
  const engineOils = getProductsByCategory("engine-oil");

  return (
    <>
      <Hero />
      <BrandShowcase />
      <CategoryBanners />
      <FeaturedProducts />
      <TravelEssentials />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Lubricants"
          title="Genuine Engine Oils"
          subtitle="OEM-grade 4T and 2T engine oils in the exact grade your bike was designed for."
          viewAllHref="/shop?category=engine-oil"
        />
        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {engineOils.slice(0, 8).map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </RevealGroup>
      </section>

      <TrustFeatures />
    </>
  );
}
