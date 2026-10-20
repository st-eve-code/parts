import { StarIcon, StarHalfIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Rating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25;
  return (
    <span className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) {
          return <StarIcon key={i} className="h-4 w-4 text-amber-400" />;
        }
        if (i === full && hasHalf) {
          return <StarHalfIcon key={i} className="h-4 w-4 text-amber-400" />;
        }
        return <StarIcon key={i} className="h-4 w-4 text-gray-200" />;
      })}
    </span>
  );
}
