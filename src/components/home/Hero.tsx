"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { brands } from "@/data/brands";
import { ArrowRightIcon, SearchIcon, GearIcon } from "@/components/icons";

const stats = [
  { value: "10,000+", label: "Genuine Parts" },
  { value: "9", label: "Brands Covered" },
  { value: "100%", label: "Original Quality" },
  { value: "24 Hrs", label: "Dispatch" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-eyebrow",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".hero-word",
          { autoAlpha: 0, y: 60, rotateX: 45 },
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08 },
          "-=0.2",
        )
        .fromTo(
          ".hero-sub",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.3",
        )
        .fromTo(
          ".hero-stat",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.2",
        );

      gsap.to(".hero-gear", {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".hero-gear", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
      <GearIcon className="hero-gear pointer-events-none absolute -right-28 top-8 h-[480px] w-[480px] text-white/5" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              100% Original Spare Parts • Assured Prices
            </p>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]">
              <span className="hero-word inline-block">Genuine</span>{" "}
              <span className="hero-word inline-block">Parts</span>{" "}
              <span className="hero-word inline-block">For</span>{" "}
              <span className="hero-word inline-block bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                Every
              </span>{" "}
              <span className="hero-word inline-block bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                Bike
              </span>
            </h1>
            <p className="hero-sub mt-6 max-w-xl text-base leading-relaxed text-gray-400">
              Ride with confidence. Genuine OEM-grade spare parts for{" "}
              {brands.slice(0, 9).map((b) => b.name).join(" • ")} and more — delivered in original
              packaging at the lowest assured prices.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-dark"
              >
                Browse All Parts
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="#brands"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                Shop By Brand
              </a>
            </div>

            <form
              action="/shop"
              method="get"
              className="hero-cta mt-8 flex max-w-xl items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur"
            >
              <SearchIcon className="ml-4 h-5 w-5 shrink-0 text-gray-500" />
              <input
                name="q"
                placeholder="Try 'Piston for Splendor' or 'Brake Pad Activa'..."
                className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-gray-500"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="m-1.5 shrink-0 rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Search
              </button>
            </form>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {brands.slice(0, 4).map((b, i) => (
                <Link
                  key={b.id}
                  href={`/shop/${b.id}`}
                  className={`group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/10 ${
                    i % 2 === 1 ? "translate-y-8" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.image}
                    alt={`${b.name} parts`}
                    width={200}
                    height={130}
                    className="h-16 w-full object-contain opacity-90 transition group-hover:opacity-100"
                  />
                  <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-white">
                    Shop {b.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat bg-gray-950 px-5 py-5 text-center">
              <p className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
