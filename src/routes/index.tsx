/**
 * Feed principal: hero carousel, géneros y filas horizontales por categoría.
 * El loader trae el feed sin adulto; si el usuario lo activa se refetch.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getHomeFeed } from "@/lib/tmdb/api";
import { useSettings, HOME_SECTIONS, type HomeSectionId } from "@/lib/stores/settings";
import { sortMedia } from "@/lib/sort-media";
import { HeroCarousel } from "@/components/media/hero-carousel";
import { MediaRow } from "@/components/media/media-row";
import { GenreNav } from "@/components/home/genre-nav";
import { RowSkeleton, Skeleton } from "@/components/ui/skeleton";
import type { HomeFeed, TmdbMedia } from "@/lib/tmdb/types";

export const Route = createFileRoute("/")({
  loader: () => getHomeFeed({ data: {} }),
  component: Home,
  pendingComponent: HomePending,
});

function HomePending() {
  return (
    <div>
      <Skeleton className="h-[min(88vh,42rem)] rounded-none" />
      <div className="mx-auto max-w-[90rem] space-y-10 px-4 py-10 sm:px-6">
        <RowSkeleton />
        <RowSkeleton />
      </div>
    </div>
  );
}

function Home() {
  const initial = Route.useLoaderData() as HomeFeed;
  const hidden = useSettings((s) => s.hiddenSections);
  const sort = useSettings((s) => s.sort);
  const includeAdult = useSettings((s) => s.includeAdult);

  const { data } = useQuery({
    queryKey: ["home-feed", includeAdult],
    queryFn: () => getHomeFeed({ data: { includeAdult } }),
    initialData: includeAdult ? undefined : initial,
    placeholderData: initial,
  });
  const feed = data ?? initial;

  const visible = (items: TmdbMedia[]) =>
    includeAdult ? items : items.filter((i) => !i.adult);

  const rows: {
    id: HomeSectionId;
    title: string;
    items: TmdbMedia[];
    type?: "movie" | "tv";
    genre?: string;
  }[] = [
    { id: "popularMovies", title: "Películas populares", items: visible(feed.popularMovies), type: "movie" },
    { id: "topMovies", title: "Mejor valoradas", items: visible(feed.topMovies), type: "movie" },
    { id: "nowPlaying", title: "En cines", items: visible(feed.nowPlaying), type: "movie" },
    { id: "upcoming", title: "Próximos estrenos", items: visible(feed.upcoming), type: "movie" },
    { id: "popularTv", title: "Series populares", items: visible(feed.popularTv), type: "tv" },
    { id: "topTv", title: "Series mejor valoradas", items: visible(feed.topTv), type: "tv" },
    { id: "onAir", title: "En emisión", items: visible(feed.onAir), type: "tv" },
    { id: "action", title: "Acción", items: visible(feed.action), type: "movie", genre: "28" },
    { id: "comedy", title: "Comedia", items: visible(feed.comedy), type: "movie", genre: "35" },
    { id: "drama", title: "Drama", items: visible(feed.drama), type: "movie", genre: "18" },
    { id: "thriller", title: "Thriller", items: visible(feed.thriller ?? []), type: "movie", genre: "53" },
    { id: "scifi", title: "Ciencia ficción", items: visible(feed.scifi ?? []), type: "movie", genre: "878" },
    { id: "horror", title: "Terror", items: visible(feed.horror ?? []), type: "movie", genre: "27" },
    { id: "animation", title: "Animación", items: visible(feed.animation ?? []), type: "movie", genre: "16" },
    { id: "romance", title: "Romance", items: visible(feed.romance ?? []), type: "movie", genre: "10749" },
  ];

  return (
    <div>
      {hidden.includes("trending") ? null : <HeroCarousel items={visible(feed.trending)} />}
      <div className="mx-auto max-w-[90rem] space-y-10 px-4 py-8 sm:px-6">
        <GenreNav movieGenres={feed.movieGenres} tvGenres={feed.tvGenres} />
        {rows
          .filter((r) => !hidden.includes(r.id))
          .map((r) => (
            <MediaRow
              key={r.id}
              title={HOME_SECTIONS.find((s) => s.id === r.id)?.label ?? r.title}
              items={sortMedia(r.items, sort)}
              forceType={r.type}
              href={{
                to: "/catalog",
                search: { type: r.type, genre: r.genre, sort: "popularity.desc" },
              }}
            />
          ))}
      </div>
    </div>
  );
}
