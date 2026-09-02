/**
 * Temporadas de una serie: acordeón que carga episodios bajo demanda.
 */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import type { TmdbSeasonSummary } from "@/lib/tmdb/types";
import { getSeason } from "@/lib/tmdb/api";
import { formatDate, formatRuntime } from "@/lib/format";
import { tmdbImg } from "@/lib/tmdb/images";
import { RatingBadge } from "@/components/media/rating-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function SeasonBlock({
  tvId,
  season,
  open,
  onToggle,
}: {
  tvId: string;
  season: TmdbSeasonSummary;
  open: boolean;
  onToggle: () => void;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["season", tvId, season.season_number],
    queryFn: () => getSeason({ data: { tvId, season: season.season_number } }),
    enabled: open,
  });

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-4 text-left"
      >
        <div className="h-20 w-14 shrink-0 overflow-hidden rounded-md bg-elevated">
          {season.poster_path ? (
            <img
              src={tmdbImg(season.poster_path, "w185") ?? ""}
              alt=""
              className="size-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">{season.name}</h3>
          <p className="text-xs text-muted">
            {season.episode_count} episodios
            {season.air_date ? ` · ${formatDate(season.air_date)}` : ""}
          </p>
          {season.overview ? (
            <p className="mt-1 line-clamp-2 text-sm text-muted">{season.overview}</p>
          ) : null}
        </div>
        <ChevronDown className={cn("size-5 shrink-0 text-muted transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="border-t border-border p-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          ) : null}
          {isError ? <p className="text-sm text-red">No se pudieron cargar los episodios.</p> : null}
          {data?.episodes?.map((ep) => (
            <div key={ep.id} className="flex gap-3 border-b border-border py-3 last:border-0">
              <div className="h-16 w-28 shrink-0 overflow-hidden rounded-md bg-elevated">
                {ep.still_path ? (
                  <img
                    src={tmdbImg(ep.still_path, "w300") ?? ""}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">
                    {ep.episode_number}. {ep.name}
                  </p>
                  <RatingBadge value={ep.vote_average} />
                </div>
                <p className="text-xs text-muted">
                  {formatDate(ep.air_date)} · {formatRuntime(ep.runtime)}
                </p>
                {ep.overview ? (
                  <p className="mt-1 line-clamp-3 text-sm text-muted">{ep.overview}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function SeasonList({
  tvId,
  seasons,
}: {
  tvId: string;
  seasons: TmdbSeasonSummary[];
}) {
  const list = seasons.filter((s) => s.season_number >= 0);
  const [open, setOpen] = useState<number | null>(list[0]?.season_number ?? null);

  if (!list.length) return <p className="text-sm text-muted">Sin temporadas.</p>;

  return (
    <div className="space-y-3">
      {list.map((s) => (
        <SeasonBlock
          key={s.id}
          tvId={tvId}
          season={s}
          open={open === s.season_number}
          onToggle={() => setOpen((v) => (v === s.season_number ? null : s.season_number))}
        />
      ))}
    </div>
  );
}
