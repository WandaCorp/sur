/**
 * Catálogo por categoría con infinite scroll y filtros de orden / año / tipo.
 */
import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { tmdbGet } from "@/lib/tmdb/api";
import { useSettings } from "@/lib/stores/settings";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { PosterCard } from "@/components/media/poster-card";
import { PosterSkeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { TmdbGenre, TmdbListResponse, TmdbMedia } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

type CatalogSearch = {
  type?: "movie" | "tv";
  genre?: string;
  sort?: string;
  year?: string;
};

function str(v: unknown): string | undefined {
  if (v == null || v === "") return undefined;
  return String(v);
}

export const Route = createFileRoute("/catalog")({
  validateSearch: (s: Record<string, unknown>): CatalogSearch => ({
    type: s.type === "tv" ? "tv" : "movie",
    genre: str(s.genre),
    sort: str(s.sort) ?? "popularity.desc",
    year: str(s.year),
  }),
  component: CatalogPage,
  head: () => ({
    meta: [
      { title: "Catálogo · MHD+" },
      { name: "description", content: "Explora películas y series por género, año y popularidad." },
    ],
  }),
});

const SORTS_MOVIE = [
  { id: "popularity.desc", label: "Popularidad" },
  { id: "vote_average.desc", label: "Rating" },
  { id: "primary_release_date.desc", label: "Estreno" },
  { id: "original_title.asc", label: "Título" },
];

const SORTS_TV = [
  { id: "popularity.desc", label: "Popularidad" },
  { id: "vote_average.desc", label: "Rating" },
  { id: "first_air_date.desc", label: "Estreno" },
  { id: "original_name.asc", label: "Título" },
];

function CatalogPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/catalog" });
  const type = search.type ?? "movie";
  const includeAdult = useSettings((s) => s.includeAdult);
  const sorts = type === "tv" ? SORTS_TV : SORTS_MOVIE;
  const sort = search.sort ?? "popularity.desc";

  const genresQuery = useQuery({
    queryKey: ["genres", type],
    queryFn: () =>
      tmdbGet({ data: { path: type === "tv" ? "/genre/tv/list" : "/genre/movie/list" } }) as unknown as Promise<{
        genres: TmdbGenre[];
      }>,
  });

  const discover = useInfiniteQuery({
    queryKey: ["discover", type, search.genre, sort, search.year, includeAdult],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const query: Record<string, string | number | boolean | undefined> = {
        page: pageParam,
        sort_by: sort,
        include_adult: includeAdult,
        "vote_count.gte": sort.startsWith("vote_average") ? 80 : undefined,
      };
      if (search.genre) query.with_genres = search.genre;
      if (search.year) {
        if (type === "tv") query.first_air_date_year = search.year;
        else query.primary_release_year = search.year;
      }
      return tmdbGet({
        data: { path: `/discover/${type}`, query, includeAdult },
      }) as Promise<TmdbListResponse<TmdbMedia>>;
    },
    getNextPageParam: (last) => (last.page < last.total_pages && last.page < 500 ? last.page + 1 : undefined),
  });

  const items = useMemo(
    () => discover.data?.pages.flatMap((p) => p.results) ?? [],
    [discover.data],
  );
  const sentinel = useInfiniteScroll(
    () => {
      if (discover.hasNextPage && !discover.isFetchingNextPage) void discover.fetchNextPage();
    },
    Boolean(discover.hasNextPage),
  );

  const genres = genresQuery.data?.genres ?? [];
  const activeGenre = genres.find((g) => String(g.id) === search.genre);
  const kindLabel = type === "tv" ? "Series" : "Películas";
  const title = search.genre
    ? activeGenre
      ? `${activeGenre.name} · ${kindLabel}`
      : kindLabel
    : type === "tv"
      ? "Todas las series"
      : "Todas las películas";

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Catálogo</p>
      <h1 className="mt-1 font-display text-4xl tracking-wide sm:text-5xl">{title}</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/catalog"
          search={{ type: "movie", sort, year: search.year }}
          className={cn(
            "h-10 rounded-full border px-4 text-sm leading-10",
            type === "movie" ? "border-gold bg-gold text-gold-fg" : "border-border text-muted",
          )}
        >
          Películas
        </Link>
        <Link
          to="/catalog"
          search={{ type: "tv", sort, year: search.year }}
          className={cn(
            "h-10 rounded-full border px-4 text-sm leading-10",
            type === "tv" ? "border-gold bg-gold text-gold-fg" : "border-border text-muted",
          )}
        >
          Series
        </Link>
      </div>

      <nav className="row-fade mt-4" aria-label="Géneros">
        <div className="row-scroll gap-2">
          <Link
            to="/catalog"
            search={{ type, sort, year: search.year }}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm",
              !search.genre ? "border-gold text-gold" : "border-border text-muted",
            )}
          >
            Todos
          </Link>
          {genres.map((g) => (
            <Link
              key={g.id}
              to="/catalog"
              search={{ type, genre: String(g.id), sort, year: search.year }}
              className={cn(
                "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm",
                search.genre === String(g.id) ? "border-gold text-gold" : "border-border text-muted",
              )}
            >
              {g.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full sm:max-w-xs">
          <label className="mb-1 block text-xs text-muted">Ordenar</label>
          <Select
            value={sort}
            onValueChange={(v) => {
              void navigate({ search: { ...search, sort: v } });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sorts.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:max-w-[8rem]">
          <label className="mb-1 block text-xs text-muted" htmlFor="year">
            Año
          </label>
          <Input
            id="year"
            inputMode="numeric"
            placeholder="2024"
            defaultValue={search.year ?? ""}
            onBlur={(e) => {
              const year = e.target.value.trim();
              void navigate({
                search: { ...search, year: year || undefined },
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
        </div>
      </div>

      {discover.isError ? (
        <p className="mt-8 text-sm text-red">Error de conexión. Inténtalo de nuevo.</p>
      ) : null}

      {!discover.isLoading && !discover.isError && items.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No hay títulos con esos filtros. Prueba otro año o género.</p>
      ) : null}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {discover.isLoading
          ? Array.from({ length: 12 }).map((_, i) => <PosterSkeleton key={i} className="w-full" />)
          : items.map((item) => (
              <PosterCard key={item.id} item={item} forceType={type} className="w-full" />
            ))}
      </div>

      <div ref={sentinel} className="h-16" />
      {discover.isFetchingNextPage ? (
        <p className="pb-8 text-center text-sm text-muted">Cargando más…</p>
      ) : null}
    </div>
  );
}
