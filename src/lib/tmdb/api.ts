/**
 * Funciones de servidor (createServerFn) que el cliente llama como RPC.
 * El handler corre solo en el servidor: ahí se importa el proxy con la API key.
 */
import { createServerFn } from "@tanstack/react-start";
import type {
  HomeFeed,
  TmdbCollection,
  TmdbListResponse,
  TmdbMedia,
  TmdbMovieDetails,
  TmdbPerson,
  TmdbSeasonDetails,
  TmdbTvDetails,
} from "./types";

/** Un solo viaje a TMDb por ficha: créditos, vídeos, galería, similares y extras. */
const APPEND_MEDIA =
  "credits,videos,images,recommendations,similar,keywords,watch/providers,external_ids,release_dates,content_ratings";

export const tmdbGet = createServerFn({ method: "POST" })
  .validator((d: { path: string; query?: Record<string, string | number | boolean | undefined>; includeAdult?: boolean }) => d)
  .handler(async ({ data }) => {
    const { tmdbRequest, stripAdult } = await import("./proxy.server");
    const json = await tmdbRequest<TmdbListResponse<TmdbMedia>>(data.path, data.query ?? {});
    if (json && typeof json === "object" && "results" in json) {
      return stripAdult(json, Boolean(data.includeAdult));
    }
    return json;
  });

export const getHomeFeed = createServerFn({ method: "GET" })
  .validator((d?: { includeAdult?: boolean }) => d ?? {})
  .handler(async ({ data }) => {
    const { tmdbRequest, stripAdult } = await import("./proxy.server");
    const allow = Boolean(data.includeAdult);
    const take = (list: TmdbListResponse<TmdbMedia>) =>
      stripAdult(list, allow).results.filter((r) => r.poster_path || r.backdrop_path);

    const discover = (genre: number) =>
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/discover/movie", {
        with_genres: genre,
        sort_by: "popularity.desc",
      });

    const [
      trending,
      popularMovies,
      topMovies,
      upcoming,
      nowPlaying,
      popularTv,
      topTv,
      onAir,
      action,
      comedy,
      drama,
      thriller,
      scifi,
      horror,
      animation,
      romance,
      movieGenres,
      tvGenres,
    ] = await Promise.all([
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/trending/all/week"),
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/movie/popular"),
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/movie/top_rated"),
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/movie/upcoming"),
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/movie/now_playing"),
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/tv/popular"),
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/tv/top_rated"),
      tmdbRequest<TmdbListResponse<TmdbMedia>>("/tv/on_the_air"),
      discover(28),
      discover(35),
      discover(18),
      discover(53),
      discover(878),
      discover(27),
      discover(16),
      discover(10749),
      tmdbRequest<{ genres: { id: number; name: string }[] }>("/genre/movie/list"),
      tmdbRequest<{ genres: { id: number; name: string }[] }>("/genre/tv/list"),
    ]);

    const feed: HomeFeed = {
      trending: take(trending).slice(0, 12),
      popularMovies: take(popularMovies),
      topMovies: take(topMovies),
      upcoming: take(upcoming),
      nowPlaying: take(nowPlaying),
      popularTv: take(popularTv),
      topTv: take(topTv),
      onAir: take(onAir),
      action: take(action),
      comedy: take(comedy),
      drama: take(drama),
      thriller: take(thriller),
      scifi: take(scifi),
      horror: take(horror),
      animation: take(animation),
      romance: take(romance),
      movieGenres: movieGenres.genres,
      tvGenres: tvGenres.genres,
    };
    return feed;
  });

export const getMediaDetails = createServerFn({ method: "GET" })
  .validator((d: { id: string; type: "movie" | "tv" }) => d)
  .handler(async ({ data }) => {
    const { tmdbRequest, trimImages } = await import("./proxy.server");
    const path = data.type === "movie" ? `/movie/${data.id}` : `/tv/${data.id}`;
    const json = await tmdbRequest<TmdbMovieDetails | TmdbTvDetails>(path, {
      append_to_response: APPEND_MEDIA,
      include_image_language: "es,en,null",
    });
    const trimmed = trimImages(json);
    if (trimmed.recommendations?.results) {
      trimmed.recommendations.results = trimmed.recommendations.results.slice(0, 14);
    }
    if (trimmed.similar?.results) {
      trimmed.similar.results = trimmed.similar.results.slice(0, 14);
    }
    if (trimmed.credits?.cast) trimmed.credits.cast = trimmed.credits.cast.slice(0, 40);
    return trimmed;
  });

export const getPersonDetails = createServerFn({ method: "GET" })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const { tmdbRequest, trimImages } = await import("./proxy.server");
    const json = await tmdbRequest<TmdbPerson>(`/person/${data.id}`, {
      append_to_response: "combined_credits,images,external_ids",
    });
    return trimImages(json);
  });

export const getSeason = createServerFn({ method: "GET" })
  .validator((d: { tvId: string; season: number }) => d)
  .handler(async ({ data }) => {
    const { tmdbRequest } = await import("./proxy.server");
    return tmdbRequest<TmdbSeasonDetails>(`/tv/${data.tvId}/season/${data.season}`);
  });

export const getCollection = createServerFn({ method: "GET" })
  .validator((d: { id: number }) => d)
  .handler(async ({ data }) => {
    const { tmdbRequest } = await import("./proxy.server");
    return tmdbRequest<TmdbCollection>(`/collection/${data.id}`);
  });

export const searchMulti = createServerFn({ method: "GET" })
  .validator((d: { q: string; includeAdult?: boolean }) => d)
  .handler(async ({ data }) => {
    const { tmdbRequest, stripAdult } = await import("./proxy.server");
    const json = await tmdbRequest<TmdbListResponse<TmdbMedia>>("/search/multi", {
      query: data.q,
      include_adult: Boolean(data.includeAdult),
    });
    return stripAdult(json, Boolean(data.includeAdult));
  });
