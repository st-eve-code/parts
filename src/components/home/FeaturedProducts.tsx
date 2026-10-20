import { featuredProducts, travelEssentials } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/gsap/Reveal";

export function FeaturedProducts() {
  const items = featuredProducts.slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Best Of The Store"
        title="Featured Products"
        subtitle="Hand-picked genuine parts with the highest ratings and best value for money."
        viewAllHref="/shop"
      />
      <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </RevealGroup>
    </section>
  );
}

export function TravelEssentials() {
  const items = travelEssentials.slice(0, 8);
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Genuine Accessories"
          title="Travel Essentials"
          subtitle="Official Royal Enfield accessories — engine guards, seats, panniers and more."
          viewAllHref="/shop/royal-enfield"
        />
        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
