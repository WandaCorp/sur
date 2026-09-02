/**
 * Búsqueda global con filtros: tipo, año, género y orden.
 */
import { useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { tmdbGet } from "@/lib/tmdb/api";
import { useSettings } from "@/lib/stores/settings";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { PosterCard } from "@/components/media/poster-card";
import { PosterSkeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdultToggle } from "@/components/home/adult-toggle";
import type { TmdbGenre, TmdbListResponse, TmdbMedia } from "@/lib/tmdb/types";
import { mediaTypeOf } from "@/lib/format";
import { cn } from "@/lib/utils";

type SearchParams = {
  q?: string;
  type?: "all" | "movie" | "tv" | "person";
  year?: string;
  genre?: string;
  sort?: string;
};

function str(v: unknown): string | undefined {
  if (v == null || v === "") return undefined;
  return String(v);
}

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: str(s.q) ?? "",
    type: s.type === "movie" || s.type === "tv" || s.type === "person" ? s.type : "all",
    year: str(s.year),
    genre: str(s.genre),
    sort: str(s.sort) ?? "popularity.desc",
  }),
  component: SearchPage,
  head: () => ({
    meta: [{ title: "Buscar · MHD+" }],
  }),
});

function SearchPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const includeAdult = useSettings((s) => s.includeAdult);
  const q = search.q?.trim() ?? "";
  const type = search.type ?? "all";

  const genresQuery = useQuery({
    queryKey: ["genres", "movie"],
    queryFn: () => tmdbGet({ data: { path: "/genre/movie/list" } }) as unknown as Promise<{ genres: TmdbGenre[] }>,
  });

  const path =
    type === "tv" ? "/search/tv" : type === "person" ? "/search/person" : type === "movie" ? "/search/movie" : "/search/multi";

  const results = useInfiniteQuery({
    queryKey: ["search-page", path, q, includeAdult, search.year],
    enabled: q.length >= 2,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const query: Record<string, string | number | boolean | undefined> = {
        query: q,
        page: pageParam,
        include_adult: includeAdult,
      };
      if (search.year && type === "movie") query.year = search.year;
      if (search.year && type === "tv") query.first_air_date_year = search.year;
      return tmdbGet({
        data: { path, query, includeAdult },
      }) as Promise<TmdbListResponse<TmdbMedia>>;
    },
    getNextPageParam: (last) => (last.page < last.total_pages && last.page < 500 ? last.page + 1 : undefined),
  });

  const raw = useMemo(() => results.data?.pages.flatMap((p) => p.results) ?? [], [results.data]);

  const items = useMemo(() => {
    let list = raw;
    if (search.genre) {
      const gid = Number(search.genre);
      list = list.filter((i) => i.genre_ids?.includes(gid));
    }
    if (search.sort === "vote_average.desc") {
      list = [...list].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    } else if (search.sort === "original_title.asc") {
      list = [...list].sort((a, b) => (a.title || a.name || "").localeCompare(b.title || b.name || "", "es"));
    } else {
      list = [...list].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    return list;
  }, [raw, search.genre, search.sort]);

  const sentinel = useInfiniteScroll(
    () => {
      if (results.hasNextPage && !results.isFetchingNextPage) void results.fetchNextPage();
    },
    Boolean(results.hasNextPage),
  );

  const types = [
    { id: "all", label: "Todo" },
    { id: "movie", label: "Películas" },
    { id: "tv", label: "Series" },
    { id: "person", label: "Personas" },
  ] as const;

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Buscar</h1>
      <form
        className="mt-6 max-w-xl"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const next = String(fd.get("q") || "").trim();
          void navigate({ search: { ...search, q: next } });
        }}
      >
        <Input name="q" defaultValue={q} placeholder="Título, serie o persona" aria-label="Consulta" />
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => void navigate({ search: { ...search, type: t.id } })}
            className={cn(
              "h-10 rounded-full border px-4 text-sm",
              type === t.id ? "border-gold bg-gold text-gold-fg" : "border-border text-muted",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full sm:max-w-xs">
          <label className="mb-1 block text-xs text-muted">Ordenar</label>
          <Select
            value={search.sort ?? "popularity.desc"}
            onValueChange={(v) => void navigate({ search: { ...search, sort: v } })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity.desc">Popularidad</SelectItem>
              <SelectItem value="vote_average.desc">Rating</SelectItem>
              <SelectItem value="original_title.asc">Título</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:max-w-[8rem]">
          <label className="mb-1 block text-xs text-muted" htmlFor="s-year">
            Año
          </label>
          <Input
            id="s-year"
            defaultValue={search.year ?? ""}
            placeholder="2024"
            onBlur={(e) =>
              void navigate({ search: { ...search, year: e.target.value.trim() || undefined } })
            }
          />
        </div>
        <div className="w-full sm:max-w-xs">
          <label className="mb-1 block text-xs text-muted">Género</label>
          <Select
            value={search.genre ?? "all"}
            onValueChange={(v) =>
              void navigate({ search: { ...search, genre: v === "all" ? undefined : v } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {(genresQuery.data?.genres ?? []).map((g) => (
                <SelectItem key={g.id} value={String(g.id)}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 max-w-xl rounded-xl border border-border bg-surface p-4">
        <AdultToggle />
      </div>

      {!q || q.length < 2 ? (
        <p className="mt-10 text-sm text-muted">Escribe al menos 2 caracteres para buscar.</p>
      ) : results.isError ? (
        <p className="mt-10 text-sm text-red">Error de conexión con TMDb.</p>
      ) : (
        <>
          <p className="mt-8 text-sm text-muted">
            {results.data?.pages[0]?.total_results ?? 0} resultados
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {results.isLoading
              ? Array.from({ length: 12 }).map((_, i) => <PosterSkeleton key={i} className="w-full" />)
              : items.map((item) => {
                  const kind = mediaTypeOf(item);
                  return (
                    <PosterCard
                      key={`${kind}-${item.id}`}
                      item={item}
                      forceType={kind === "person" ? "person" : kind}
                      className="w-full"
                    />
                  );
                })}
          </div>
          {!results.isLoading && items.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Sin coincidencias para “{q}”.</p>
          ) : null}
          <div ref={sentinel} className="h-16" />
        </>
      )}
    </div>
  );
}
