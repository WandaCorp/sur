/**
 * Badge de puntuación TMDb (0–10) con color semántico.
 */
import { Star } from "lucide-react";
import { ratingTone } from "@/lib/format";
import { cn } from "@/lib/utils";

export function RatingBadge({
  value,
  className,
  size = "sm",
}: {
  value: number;
  className?: string;
  size?: "sm" | "lg";
}) {
  if (!value) return null;
  const tone = ratingTone(value);
  const color =
    tone === "gold"
      ? "text-gold"
      : tone === "cyan"
        ? "text-cyan"
        : tone === "red"
          ? "text-red"
          : "text-muted";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold tabular-nums",
        size === "lg" ? "text-lg" : "text-xs",
        color,
        className,
      )}
    >
      <Star className={size === "lg" ? "size-4 fill-current" : "size-3 fill-current"} />
      {value.toFixed(1)}
    </span>
  );
}
