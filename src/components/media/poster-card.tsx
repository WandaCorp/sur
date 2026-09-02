/**
 * Tarjeta de póster clickeable (película, serie o persona).
 * Lazy-loading nativo + tamaños según ajustes de visualización.
 */
import { Link } from "@tanstack/react-router";
import { Clapperboard, User } from "lucide-react";
import type { TmdbMedia } from "@/lib/tmdb/types";
import { mediaDate, mediaTitle, mediaTypeOf, formatYear } from "@/lib/format";
import { posterSizeFor, posterWidthClass, tmdbImg } from "@/lib/tmdb/images";
import { useSettings } from "@/lib/stores/settings";
import { RatingBadge } from "./rating-badge";
import { cn } from "@/lib/utils";

export function PosterCard({
  item,
  forceType,
  className,
}: {
  item: TmdbMedia;
  forceType?: "movie" | "tv" | "person";
  className?: string;
}) {
  const quality = useSettings((s) => s.imageQuality);
  const size = useSettings((s) => s.posterSize);
  const kind = forceType ?? mediaTypeOf(item);
  const title = mediaTitle(item);
  const year = formatYear(mediaDate(item));
  const role = item.character || item.job;
  const poster =
    kind === "person"
      ? tmdbImg(item.profile_path, "w185")
      : tmdbImg(item.poster_path, posterSizeFor(quality, size));

  const to =
    kind === "person"
      ? "/person/$id"
      : kind === "tv"
        ? "/tv/$id"
        : "/movie/$id";

  return (
    <Link
      to={to}
      params={{ id: String(item.id) }}
      className={cn("poster-card group block", posterWidthClass(size), className)}
      aria-label={role ? `${title} · ${role}` : title}
    >
      <article className="overflow-hidden rounded-lg bg-elevated">
        <div className="relative aspect-[2/3] bg-surface">
          {poster ? (
            <img
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-subtle">
              {kind === "person" ? <User className="size-10" /> : <Clapperboard className="size-10" />}
            </div>
          )}
          {kind !== "person" && item.vote_average ? (
            <div className="absolute top-2 right-2 rounded-full bg-black/75 px-2 py-0.5">
              <RatingBadge value={item.vote_average} />
            </div>
          ) : null}
        </div>
        <div className="space-y-0.5 px-2 py-2">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-gold">
            {title}
          </h3>
          {role ? (
            <p className="line-clamp-1 text-xs text-muted">{role}</p>
          ) : year ? (
            <p className="text-xs text-muted">{year}</p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
