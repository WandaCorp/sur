/**
 * Chip compacto para géneros, ratings y estados.
 */
import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-transparent bg-elevated text-fg",
        gold: "border-transparent bg-gold text-gold-fg",
        outline: "border-border text-muted",
        red: "border-transparent bg-red text-fg",
        cyan: "border-transparent bg-cyan/20 text-cyan",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
