/**
 * Fila horizontal de pósters con scroll táctil y título de sección.
 */
import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { TmdbMedia } from "@/lib/tmdb/types";
import { PosterCard } from "./poster-card";
import { RowSkeleton } from "@/components/ui/skeleton";

export function MediaRow({
  title,
  items,
  href,
  forceType,
  loading,
}: {
  title: string;
  items?: TmdbMedia[];
  href?: { to: "/catalog"; search: { type?: "movie" | "tv"; genre?: string; sort?: string } };
  forceType?: "movie" | "tv";
  loading?: boolean;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3 px-1">
        <h2 className="font-display text-2xl tracking-wide text-fg md:text-3xl">{title}</h2>
        {href ? (
          <Link
            to={href.to}
            search={href.search}
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-gold"
          >
            Ver todo <ChevronRight className="size-4" />
          </Link>
        ) : null}
      </div>
      {loading || !items ? (
        <RowSkeleton />
      ) : items.length === 0 ? (
        <p className="px-1 text-sm text-muted">No hay títulos en esta sección.</p>
      ) : (
        <div className="row-fade">
          <div className="row-scroll">
            {items.map((item) => (
              <PosterCard key={`${item.media_type ?? forceType}-${item.id}`} item={item} forceType={forceType} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
