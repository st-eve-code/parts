import Link from "next/link";
import { Reveal } from "@/components/gsap/Reveal";

const banners = [
  {
    image: "/images/parts/promo-1.svg",
    href: "/shop/royal-enfield",
    title: "Genuine Accessories",
  },
  {
    image: "/images/parts/promo-2.svg",
    href: "/shop?category=engine-oil",
    title: "Engine Oils",
  },
];

export function CategoryBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <Reveal className="grid gap-5 lg:grid-cols-2">
        {banners.map((banner) => (
          <Link
            key={banner.title}
            href={banner.href}
            className="group relative block overflow-hidden rounded-2xl shadow-lg shadow-gray-200/50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.image}
              alt={banner.title}
              width={1200}
              height={300}
              loading="lazy"
              className="w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <span className="absolute bottom-4 right-6 rounded-full bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-gray-900 transition group-hover:bg-primary group-hover:text-white">
              Shop Now
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
