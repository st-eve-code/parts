import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4",
        align === "center" && "flex-col items-center text-center",
      )}
    >
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        )}
        <h2
          className={cn(
            "text-2xl font-extrabold tracking-tight sm:text-3xl",
            dark ? "text-white" : "text-gray-900",
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={cn("mt-2 max-w-2xl text-sm", dark ? "text-gray-400" : "text-gray-500")}>
            {subtitle}
          </p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition",
            dark ? "text-white hover:text-primary" : "text-primary hover:text-primary-dark",
          )}
        >
          {viewAllLabel}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
