import { site } from "@/data/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(amount: number): string {
  return `${site.currency}${amount.toFixed(2)}`;
}

export function discountPercent(price: number, mrp: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

export function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(count);
}
