/**
 * Ficha de actor/actriz: biografía, filmografía clickeable e imágenes.
 */
import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPersonDetails } from "@/lib/tmdb/api";
import { formatDate, formatCompact, mediaTypeOf } from "@/lib/format";
import { tmdbImg } from "@/lib/tmdb/images";
import { PosterCard } from "@/components/media/poster-card";
import { ImageGallery } from "@/components/details/gallery";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { TmdbMedia, TmdbPerson } from "@/lib/tmdb/types";
import { ExternalLink, User } from "lucide-react";

export const Route = createFileRoute("/person/$id")({
  loader: async ({ params }) => {
    try {
      return await getPersonDetails({ data: { id: params.id } });
    } catch (err) {
      const msg = err instanceof Error ? err.message.toLowerCase() : "";
      if (msg.includes("404") || msg.includes("not be found") || msg.includes("not found")) {
        throw notFound();
      }
      throw err;
    }
  },
  head: ({ loaderData }) => {
    const d = loaderData as TmdbPerson | undefined;
    return {
      meta: [
        { title: d?.name ? `${d.name} · MHD+` : "Persona · MHD+" },
        { name: "description", content: d?.biography?.slice(0, 160) || "Ficha de persona en MHD+." },
      ],
    };
  },
  component: PersonPage,
  pendingComponent: () => (
    <div className="mx-auto max-w-[90rem] px-4 py-10">
      <Skeleton className="h-80 w-56" />
    </div>
  ),
});

const DEPT: Record<string, string> = {
  Acting: "Interpretación",
  Directing: "Dirección",
  Writing: "Guion",
  Production: "Producción",
  Camera: "Cámara",
  Editing: "Montaje",
  Sound: "Sonido",
  Art: "Arte",
  Crew: "Equipo",
};

const GENDER: Record<number, string> = {
  1: "Mujer",
  2: "Hombre",
  3: "No binario",
};

function PersonPage() {
  const person = Route.useLoaderData() as TmdbPerson;
  const photo = tmdbImg(person.profile_path, "h632");
  const crew = person.combined_credits?.crew ?? [];
  const acting = person.combined_credits?.cast ?? [];
  const directing = crew.filter((c) => c.job === "Director" || c.department === "Directing");
  const writing = crew.filter((c) => c.department === "Writing");
  const lead =
    person.known_for_department === "Directing"
      ? [...directing, ...writing, ...crew, ...acting]
      : person.known_for_department === "Writing"
        ? [...writing, ...crew, ...acting]
        : [...acting, ...crew];

  const seen = new Set<string>();
  const filmography = lead
    .filter((c) => {
      if (!c.poster_path) return false;
      const k = `${c.media_type ?? mediaTypeOf(c)}-${c.id}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0) || (b.popularity || 0) - (a.popularity || 0));

  const movies = filmography.filter((c) => mediaTypeOf(c) === "movie");
  const shows = filmography.filter((c) => mediaTypeOf(c) === "tv");
  const profiles = person.images?.profiles ?? [];
  const imdb = person.imdb_id || person.external_ids?.imdb_id;

  return (
    <article className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full max-w-56 shrink-0 overflow-hidden rounded-xl bg-elevated">
          {photo ? (
            <img src={photo} alt={person.name} className="aspect-[2/3] w-full object-cover" />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center text-subtle">
              <User className="size-16" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Persona</p>
          <h1 className="mt-1 font-display text-5xl tracking-wide">{person.name}</h1>
          <p className="mt-2 text-sm text-muted">
            {DEPT[person.known_for_department] ?? person.known_for_department}
          </p>
          <dl className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">Nacimiento</dt>
              <dd className="mt-1">{formatDate(person.birthday)}</dd>
            </div>
            {person.deathday ? (
              <div>
                <dt className="text-muted">Fallecimiento</dt>
                <dd className="mt-1">{formatDate(person.deathday)}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-muted">Lugar</dt>
              <dd className="mt-1">{person.place_of_birth || "—"}</dd>
            </div>
            <div>
              <dt className="text-muted">Popularidad</dt>
              <dd className="mt-1 tabular-nums">{formatCompact(person.popularity)}</dd>
            </div>
            {GENDER[person.gender] ? (
              <div>
                <dt className="text-muted">Género</dt>
                <dd className="mt-1">{GENDER[person.gender]}</dd>
              </div>
            ) : null}
          </dl>
          {person.also_known_as?.length ? (
            <p className="mt-4 text-sm text-muted">
              También conocido como: {person.also_known_as.slice(0, 6).join(" · ")}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3">
            {imdb ? (
              <a
                href={`https://www.imdb.com/name/${imdb}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1 text-sm text-cyan hover:underline"
              >
                IMDb <ExternalLink className="size-3.5" />
              </a>
            ) : null}
            {person.homepage ? (
              <a
                href={person.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-1 text-sm text-cyan hover:underline"
              >
                Web <ExternalLink className="size-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-3xl tracking-wide">Biografía</h2>
        <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed text-fg/90">
          {person.biography || "Sin biografía disponible en español."}
        </p>
      </section>

      <Tabs defaultValue="all" className="mt-12">
        <TabsList>
          <TabsTrigger value="all">Filmografía</TabsTrigger>
          <TabsTrigger value="movies">Películas</TabsTrigger>
          <TabsTrigger value="tv">Series</TabsTrigger>
          <TabsTrigger value="photos">Imágenes</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Grid items={filmography} />
        </TabsContent>
        <TabsContent value="movies">
          <Grid items={movies} force="movie" />
        </TabsContent>
        <TabsContent value="tv">
          <Grid items={shows} force="tv" />
        </TabsContent>
        <TabsContent value="photos">
          <ImageGallery backdrops={[]} posters={profiles} />
        </TabsContent>
      </Tabs>
    </article>
  );
}

function Grid({ items, force }: { items: TmdbMedia[]; force?: "movie" | "tv" }) {
  const [limit, setLimit] = useState(24);
  if (!items.length) return <p className="text-sm text-muted">Sin títulos.</p>;
  const shown = items.slice(0, limit);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {shown.map((item) => (
          <PosterCard
            key={`${item.media_type}-${item.id}-${item.character ?? item.job ?? ""}`}
            item={item}
            forceType={force ?? (item.media_type === "tv" ? "tv" : "movie")}
            className="w-full"
          />
        ))}
      </div>
      {limit < items.length ? (
        <Button variant="outline" className="mt-6" onClick={() => setLimit((n) => n + 24)}>
          Ver más ({items.length - limit} restantes)
        </Button>
      ) : null}
    </div>
  );
}
