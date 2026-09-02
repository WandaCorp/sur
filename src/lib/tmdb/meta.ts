/**
 * Extrae metadatos de fichas TMDb (certificación, keywords, plataformas, trailer).
 * Las formas de keywords y ratings cambian entre /movie y /tv.
 */
import type {
  TmdbKeyword,
  TmdbMovieDetails,
  TmdbTvDetails,
  TmdbVideo,
  TmdbWatchLocale,
} from "./types";

const REGION_ORDER = ["ES", "MX", "AR", "CL", "CO", "US", "GB"];

type Details = TmdbMovieDetails | TmdbTvDetails;

export function isMovieDetails(d: Details): d is TmdbMovieDetails {
  return "runtime" in d && !("number_of_seasons" in d);
}

/** Palabras clave unificadas (movie.keywords vs tv.results). */
export function keywordsOf(data: Details): TmdbKeyword[] {
  const pack = data.keywords;
  if (!pack) return [];
  return pack.keywords ?? pack.results ?? [];
}

/** Primera certificación no vacía según preferencia de región hispana. */
export function certificationOf(data: Details): string | null {
  if (isMovieDetails(data)) {
    const blocks = data.release_dates?.results ?? [];
    for (const cc of REGION_ORDER) {
      const loc = blocks.find((b) => b.iso_3166_1 === cc);
      const cert = loc?.release_dates?.find((r) => r.certification?.trim())?.certification;
      if (cert) return cert.trim();
    }
    for (const loc of blocks) {
      const cert = loc.release_dates?.find((r) => r.certification?.trim())?.certification;
      if (cert) return cert.trim();
    }
    return null;
  }
  const blocks = data.content_ratings?.results ?? [];
  for (const cc of REGION_ORDER) {
    const loc = blocks.find((b) => b.iso_3166_1 === cc);
    if (loc?.rating?.trim()) return loc.rating.trim();
  }
  return blocks.find((b) => b.rating?.trim())?.rating?.trim() ?? null;
}

/** Plataformas de visionado: prioriza España y Latinoamérica. */
export function watchLocaleOf(data: Details): { region: string; locale: TmdbWatchLocale } | null {
  const results = data["watch/providers"]?.results;
  if (!results) return null;
  for (const cc of REGION_ORDER) {
    const loc = results[cc];
    if (loc && (loc.flatrate?.length || loc.rent?.length || loc.buy?.length || loc.ads?.length || loc.free?.length)) {
      return { region: cc, locale: loc };
    }
  }
  const first = Object.entries(results).find(
    ([, loc]) => loc && (loc.flatrate?.length || loc.rent?.length || loc.buy?.length),
  );
  return first ? { region: first[0], locale: first[1] } : null;
}

/** Primer trailer / teaser de YouTube, si existe. */
export function youtubeTrailer(videos: TmdbVideo[] | undefined): TmdbVideo | undefined {
  const yt = (videos ?? []).filter((v) => v.site === "YouTube");
  return (
    yt.find((v) => v.type === "Trailer" && v.official) ||
    yt.find((v) => v.type === "Trailer") ||
    yt.find((v) => v.type === "Teaser") ||
    yt[0]
  );
}

export function imdbIdOf(data: Details): string | null {
  if (isMovieDetails(data) && data.imdb_id) return data.imdb_id;
  return data.external_ids?.imdb_id ?? null;
}
