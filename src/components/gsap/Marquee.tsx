"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}

export function Marquee({ children, className, duration = 30, reverse = false }: MarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration, ease: "none", repeat: -1 },
      );
      return () => {
        tween.kill();
      };
    }, viewport);

    return () => ctx.revert();
  }, [duration, reverse]);

  return (
    <div ref={viewportRef} className={cn("overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max">
        {children}
        <div aria-hidden="true" className="flex">
          {children}
        </div>
      </div>
    </div>
  );
}
