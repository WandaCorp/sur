/**
 * Tipos de la API v3 de TMDb.
 * Modelan las respuestas que usamos en MHD+ (listas, detalles, personas, créditos).
 */

export type MediaType = "movie" | "tv";

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** Resultado genérico de película o serie en listados / búsqueda. */
export interface TmdbMedia {
  id: number;
  adult?: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  genre_ids?: number[];
  media_type?: "movie" | "tv" | "person";
  title?: string;
  original_title?: string;
  release_date?: string;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  character?: string;
  job?: string;
  department?: string;
  known_for_department?: string;
  profile_path?: string | null;
  gender?: number;
}

export interface TmdbCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TmdbLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TmdbCast {
  id: number;
  name: string;
  original_name?: string;
  character?: string;
  job?: string;
  department?: string;
  profile_path: string | null;
  known_for_department?: string;
  order?: number;
  popularity?: number;
}

export interface TmdbCredits {
  cast: TmdbCast[];
  crew: TmdbCast[];
}

export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TmdbImage {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  iso_639_1: string | null;
}

export interface TmdbImages {
  backdrops: TmdbImage[];
  posters: TmdbImage[];
  profiles?: TmdbImage[];
}

export interface TmdbKeyword {
  id: number;
  name: string;
}

export interface TmdbWatchProvider {
  logo_path: string | null;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface TmdbWatchLocale {
  link: string;
  flatrate?: TmdbWatchProvider[];
  rent?: TmdbWatchProvider[];
  buy?: TmdbWatchProvider[];
  ads?: TmdbWatchProvider[];
  free?: TmdbWatchProvider[];
}

export interface TmdbCollectionRef {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TmdbCollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: TmdbMedia[];
}

export interface TmdbExternalIds {
  imdb_id?: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
}

export interface TmdbMovieDetails extends TmdbMedia {
  budget: number;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string;
  homepage: string | null;
  imdb_id: string | null;
  genres: TmdbGenre[];
  production_companies: TmdbCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: TmdbLanguage[];
  belongs_to_collection?: TmdbCollectionRef | null;
  credits?: TmdbCredits;
  videos?: { results: TmdbVideo[] };
  images?: TmdbImages;
  recommendations?: TmdbListResponse<TmdbMedia>;
  similar?: TmdbListResponse<TmdbMedia>;
  keywords?: { keywords?: TmdbKeyword[]; results?: TmdbKeyword[] };
  "watch/providers"?: { results: Record<string, TmdbWatchLocale> };
  external_ids?: TmdbExternalIds;
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: { certification: string; type: number; release_date: string }[];
    }[];
  };
}

export interface TmdbSeasonSummary {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string | null;
  vote_average: number;
}

export interface TmdbEpisode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  season_number: number;
  air_date: string | null;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  crew?: TmdbCast[];
  guest_stars?: TmdbCast[];
}

export interface TmdbSeasonDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  air_date: string | null;
  episodes: TmdbEpisode[];
}

export interface TmdbTvDetails extends TmdbMedia {
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  status: string;
  tagline: string;
  homepage: string | null;
  in_production: boolean;
  type: string;
  genres: TmdbGenre[];
  created_by: { id: number; name: string; profile_path: string | null }[];
  networks: TmdbCompany[];
  production_companies: TmdbCompany[];
  production_countries?: { iso_3166_1: string; name: string }[];
  spoken_languages: TmdbLanguage[];
  seasons: TmdbSeasonSummary[];
  last_air_date?: string | null;
  origin_country?: string[];
  last_episode_to_air?: TmdbEpisode | null;
  next_episode_to_air?: TmdbEpisode | null;
  credits?: TmdbCredits;
  videos?: { results: TmdbVideo[] };
  images?: TmdbImages;
  recommendations?: TmdbListResponse<TmdbMedia>;
  similar?: TmdbListResponse<TmdbMedia>;
  keywords?: { keywords?: TmdbKeyword[]; results?: TmdbKeyword[] };
  "watch/providers"?: { results: Record<string, TmdbWatchLocale> };
  external_ids?: TmdbExternalIds;
  content_ratings?: { results: { iso_3166_1: string; rating: string }[] };
}

export interface TmdbPerson {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
  gender: number;
  also_known_as: string[];
  homepage: string | null;
  adult?: boolean;
  imdb_id?: string | null;
  combined_credits?: {
    cast: (TmdbMedia & { character?: string; media_type: "movie" | "tv" })[];
    crew: (TmdbMedia & { job?: string; department?: string; media_type: "movie" | "tv" })[];
  };
  images?: { profiles: TmdbImage[] };
  external_ids?: TmdbExternalIds;
}

export interface HomeFeed {
  trending: TmdbMedia[];
  popularMovies: TmdbMedia[];
  topMovies: TmdbMedia[];
  upcoming: TmdbMedia[];
  nowPlaying: TmdbMedia[];
  popularTv: TmdbMedia[];
  topTv: TmdbMedia[];
  onAir: TmdbMedia[];
  action: TmdbMedia[];
  comedy: TmdbMedia[];
  drama: TmdbMedia[];
  thriller: TmdbMedia[];
  scifi: TmdbMedia[];
  horror: TmdbMedia[];
  animation: TmdbMedia[];
  romance: TmdbMedia[];
  movieGenres: TmdbGenre[];
  tvGenres: TmdbGenre[];
}

export interface TmdbErrorBody {
  status_code?: number;
  status_message?: string;
  success?: boolean;
}
