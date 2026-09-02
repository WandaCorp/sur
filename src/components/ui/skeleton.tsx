/**
 * Placeholder animado (shimmer) mientras llegan los datos de TMDb.
 */
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton", className)} aria-hidden="true" {...props} />;
}

export function PosterSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("aspect-[2/3] w-[10.5rem] rounded-lg", className)} />;
}

export function RowSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="row-scroll" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <PosterSkeleton key={i} />
      ))}
    </div>
  );
}
