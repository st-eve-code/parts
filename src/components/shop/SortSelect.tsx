"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronDownIcon } from "@/components/icons";

const options = [
  { value: "featured", label: "Sort By: Featured" },
  { value: "price-asc", label: "Price: Low To High" },
  { value: "price-desc", label: "Price: High To Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A – Z" },
];

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const current = searchParams.get("sort") ?? "featured";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    const qs = params.toString();
    startTransition(() => router.replace(`/shop${qs ? `?${qs}` : ""}`));
  }

  return (
    <div className="relative">
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Sort products"
        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-primary"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      {pending && <span className="absolute right-10 top-1/2 h-2 w-2 -translate-y-1/2 animate-ping rounded-full bg-primary" />}
    </div>
  );
}
