import Link from "next/link";
import type { Brand } from "@/data/types";
import { ChevronRightIcon } from "@/components/icons";

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/shop/${brand.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60"
    >
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brand.image}
          alt={`${brand.name} spare parts`}
          width={400}
          height={260}
          loading="lazy"
          className="aspect-[10/6.5] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1.5"
          style={{ backgroundColor: brand.color }}
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <h3
            className="text-base font-extrabold uppercase tracking-wide"
            style={{ color: brand.color }}
          >
            {brand.name}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{brand.tagline}</p>
        </div>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}
