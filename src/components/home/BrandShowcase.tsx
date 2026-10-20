import { brands } from "@/data/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { Marquee } from "@/components/gsap/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup } from "@/components/gsap/Reveal";

export function BrandShowcase() {
  return (
    <section id="brands" className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Shop By Brand"
          title="Find Parts For Your Bike"
          subtitle="Choose your two-wheeler brand to browse 100% genuine spare parts for every model."
        />
        <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </RevealGroup>
      </div>

      <div className="mt-14 border-y border-gray-200 bg-white py-5">
        <Marquee className="mx-auto max-w-7xl">
          {brands.map((b) => (
            <span
              key={b.id}
              className="mx-8 inline-flex items-center gap-3 text-lg font-extrabold uppercase tracking-[0.2em] text-gray-300"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.color }} />
              {b.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
