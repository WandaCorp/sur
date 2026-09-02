/**
 * Vista de detalle compartida para película y serie.
 * Hero, metadatos, etiquetas, stats, pestañas (reparto, galería, videos, temporadas).
 */
import { Link } from "@tanstack/react-router";
import { Clapperboard, ExternalLink, Play } from "lucide-react";
import type { TmdbMovieDetails, TmdbTvDetails } from "@/lib/tmdb/types";
import { formatDate, formatMoney, formatRuntime, mediaTitle } from "@/lib/format";
import { backdropSizeFor, tmdbImg } from "@/lib/tmdb/images";
import {
  certificationOf,
  imdbIdOf,
  isMovieDetails,
  keywordsOf,
  watchLocaleOf,
  youtubeTrailer,
} from "@/lib/tmdb/meta";
import { useSettings } from "@/lib/stores/settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoriteButton } from "./favorite-button";
import { TagPicker } from "./tag-picker";
import { CastCrew } from "./cast-crew";
import { ImageGallery } from "./gallery";
import { Trailers } from "./trailers";
import { StatsPanel } from "./stats-panel";
import { SeasonList } from "./season-list";
import { WatchProviders } from "./watch-providers";
import { CollectionRow } from "./collection-row";
import { MediaRow } from "@/components/media/media-row";
import { RatingBadge } from "@/components/media/rating-badge";

type Details = TmdbMovieDetails | TmdbTvDetails;

export function MediaDetailsView({ data, type }: { data: Details; type: "movie" | "tv" }) {
  const quality = useSettings((s) => s.imageQuality);
  const title = mediaTitle(data);
  const year = isMovieDetails(data) ? data.release_date : data.first_air_date;
  const backdrop = tmdbImg(data.backdrop_path, backdropSizeFor(quality));
  const poster = tmdbImg(data.poster_path, "w500");
  const runtime = isMovieDetails(data) ? data.runtime : data.episode_run_time?.[0];
  const companies = data.production_companies ?? [];
  const langs = data.spoken_languages ?? [];
  const countries = data.production_countries ?? [];
  const original = isMovieDetails(data) ? data.original_title : data.original_name;
  const cert = certificationOf(data);
  const keywords = keywordsOf(data).slice(0, 12);
  const watch = watchLocaleOf(data);
  const trailer = youtubeTrailer(data.videos?.results);
  const imdb = imdbIdOf(data);
  const directors = (data.credits?.crew ?? []).filter((c) => c.job === "Director");
  const creators = !isMovieDetails(data) ? data.created_by ?? [] : [];
  const networks = !isMovieDetails(data) ? data.networks ?? [] : [];
  const nextEp = !isMovieDetails(data) ? data.next_episode_to_air : null;
  const lastEp = !isMovieDetails(data) ? data.last_episode_to_air : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "tv" ? "TVSeries" : "Movie",
    name: title,
    description: data.overview || undefined,
    image: poster || backdrop || undefined,
    datePublished: year || undefined,
    aggregateRating: data.vote_count
      ? {
          "@type": "AggregateRating",
          ratingValue: data.vote_average,
          bestRating: 10,
          ratingCount: data.vote_count,
        }
      : undefined,
  };

  return (
    <article>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <div className="relative min-h-[22rem] overflow-hidden md:min-h-[28rem]">
        {backdrop ? (
          <img src={backdrop} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-elevated" />
        )}
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto -mt-40 max-w-[90rem] px-4 pb-16 sm:px-6 md:-mt-48">
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div className="w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-elevated shadow-card sm:w-52">
            {poster ? (
              <img src={poster} alt={`Póster de ${title}`} className="aspect-[2/3] w-full object-cover" />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center text-subtle">
                <Clapperboard className="size-12" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              {type === "tv" ? "Serie" : "Película"}
              {cert ? ` · ${cert}` : ""}
            </p>
            <h1 className="font-display text-4xl tracking-wide sm:text-5xl md:text-6xl">{title}</h1>
            {original && original !== title ? (
              <p className="text-sm text-muted">Título original: {original}</p>
            ) : null}
            {"tagline" in data && data.tagline ? (
              <p className="text-sm text-muted italic">{data.tagline}</p>
            ) : null}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <RatingBadge value={data.vote_average} size="lg" />
              <span className="text-muted">{formatDate(year)}</span>
              <span className="text-muted">{formatRuntime(runtime)}</span>
              {"status" in data && data.status ? (
                <Badge variant="outline">{data.status}</Badge>
              ) : null}
            </div>
            {directors.length || creators.length ? (
              <p className="text-sm text-muted">
                {directors.length ? (
                  <>
                    Dirección:{" "}
                    {directors.map((d, i) => (
                      <span key={d.id}>
                        {i > 0 ? ", " : null}
                        <Link to="/person/$id" params={{ id: String(d.id) }} className="text-fg hover:text-gold">
                          {d.name}
                        </Link>
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                    Creación:{" "}
                    {creators.map((d, i) => (
                      <span key={d.id}>
                        {i > 0 ? ", " : null}
                        <Link to="/person/$id" params={{ id: String(d.id) }} className="text-fg hover:text-gold">
                          {d.name}
                        </Link>
                      </span>
                    ))}
                  </>
                )}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {(data.genres ?? []).map((g) => (
                <Link key={g.id} to="/catalog" search={{ type, genre: String(g.id) }}>
                  <Badge variant="default">{g.name}</Badge>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <FavoriteButton
                item={{
                  id: data.id,
                  mediaType: type,
                  title,
                  posterPath: data.poster_path,
                  voteAverage: data.vote_average,
                  year: year?.slice(0, 4),
                }}
              />
              {trailer ? (
                <Button asChild variant="outline">
                  <a href={`#trailers`}>
                    <Play className="size-4 fill-current" /> Ver trailer
                  </a>
                </Button>
              ) : null}
              {imdb ? (
                <Button asChild variant="ghost">
                  <a href={`https://www.imdb.com/title/${imdb}`} target="_blank" rel="noreferrer">
                    IMDb <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              ) : null}
              {data.homepage ? (
                <Button asChild variant="ghost">
                  <a href={data.homepage} target="_blank" rel="noreferrer">
                    Web <ExternalLink className="size-3.5" />
                  </a>
                </Button>
              ) : null}
            </div>
            <TagPicker id={data.id} mediaType={type} />
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-relaxed text-fg/90">
          {data.overview || "Sin sinopsis disponible."}
        </p>

        {watch ? (
          <div className="mt-8">
            <WatchProviders region={watch.region} locale={watch.locale} />
          </div>
        ) : null}

        <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 lg:grid-cols-4">
          {isMovieDetails(data) ? (
            <>
              <div>
                <dt className="text-muted">Presupuesto</dt>
                <dd className="mt-1 font-medium">{formatMoney(data.budget)}</dd>
              </div>
              <div>
                <dt className="text-muted">Ingresos</dt>
                <dd className="mt-1 font-medium">{formatMoney(data.revenue)}</dd>
              </div>
            </>
          ) : (
            <>
              <div>
                <dt className="text-muted">Temporadas</dt>
                <dd className="mt-1 font-medium tabular-nums">{data.number_of_seasons}</dd>
              </div>
              <div>
                <dt className="text-muted">Episodios</dt>
                <dd className="mt-1 font-medium tabular-nums">{data.number_of_episodes}</dd>
              </div>
            </>
          )}
          <div>
            <dt className="text-muted">Idiomas</dt>
            <dd className="mt-1 font-medium">
              {langs.map((l) => l.name || l.english_name).join(", ") || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Compañías</dt>
            <dd className="mt-1 font-medium">
              {companies.slice(0, 4).map((c) => c.name).join(", ") || "—"}
            </dd>
          </div>
          {countries.length ? (
            <div>
              <dt className="text-muted">Países</dt>
              <dd className="mt-1 font-medium">{countries.map((c) => c.name).join(", ")}</dd>
            </div>
          ) : null}
          {networks.length ? (
            <div>
              <dt className="text-muted">Cadenas</dt>
              <dd className="mt-1 font-medium">{networks.map((n) => n.name).join(", ")}</dd>
            </div>
          ) : null}
          {lastEp ? (
            <div>
              <dt className="text-muted">Último episodio</dt>
              <dd className="mt-1 font-medium">
                T{lastEp.season_number} E{lastEp.episode_number} · {formatDate(lastEp.air_date)}
              </dd>
            </div>
          ) : null}
          {nextEp ? (
            <div>
              <dt className="text-muted">Próximo episodio</dt>
              <dd className="mt-1 font-medium">
                T{nextEp.season_number} E{nextEp.episode_number} · {formatDate(nextEp.air_date)}
              </dd>
            </div>
          ) : null}
        </dl>

        {keywords.length ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {keywords.map((k) => (
              <li key={k.id}>
                <Badge variant="outline">{k.name}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10">
          <h2 className="mb-4 font-display text-3xl tracking-wide">Estadísticas</h2>
          <StatsPanel
            voteAverage={data.vote_average}
            voteCount={data.vote_count}
            popularity={data.popularity}
            budget={isMovieDetails(data) ? data.budget : undefined}
            revenue={isMovieDetails(data) ? data.revenue : undefined}
            runtime={runtime}
            seasons={!isMovieDetails(data) ? data.number_of_seasons : undefined}
            episodes={!isMovieDetails(data) ? data.number_of_episodes : undefined}
          />
        </div>

        <Tabs defaultValue="cast" className="mt-12">
          <TabsList className="flex h-auto w-full flex-wrap justify-start">
            <TabsTrigger value="cast">Ficha técnica</TabsTrigger>
            <TabsTrigger value="videos">Trailers</TabsTrigger>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            {type === "tv" ? <TabsTrigger value="seasons">Temporadas</TabsTrigger> : null}
          </TabsList>
          <TabsContent value="cast">
            <CastCrew cast={data.credits?.cast ?? []} crew={data.credits?.crew ?? []} />
          </TabsContent>
          <TabsContent value="videos">
            <div id="trailers">
              <Trailers videos={data.videos?.results ?? []} />
            </div>
          </TabsContent>
          <TabsContent value="gallery">
            <ImageGallery
              backdrops={data.images?.backdrops ?? []}
              posters={data.images?.posters ?? []}
            />
          </TabsContent>
          {type === "tv" && !isMovieDetails(data) ? (
            <TabsContent value="seasons">
              <SeasonList tvId={String(data.id)} seasons={data.seasons ?? []} />
            </TabsContent>
          ) : null}
        </Tabs>

        <div className="mt-12 space-y-10">
          {isMovieDetails(data) && data.belongs_to_collection ? (
            <CollectionRow collection={data.belongs_to_collection} />
          ) : null}
          <MediaRow
            title="Recomendaciones"
            items={data.recommendations?.results ?? []}
            forceType={type}
          />
          <MediaRow title="Similares" items={data.similar?.results ?? []} forceType={type} />
        </div>
      </div>
    </article>
  );
}
