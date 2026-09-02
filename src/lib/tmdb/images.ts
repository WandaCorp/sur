/**
 * Construcción de URLs de imagen de TMDb.
 * El tamaño se elige según la calidad y el contexto (póster, backdrop, perfil).
 */
import type { ImageQuality, PosterSize } from "@/lib/stores/settings";

const BASE = "https://image.tmdb.org/t/p";

export type TmdbImgSize =
  | "w92"
  | "w154"
  | "w185"
  | "w300"
  | "w342"
  | "w500"
  | "w780"
  | "w1280"
  | "original"
  | "h632";

/** Devuelve la URL absoluta o null si no hay path. */
export function tmdbImg(path: string | null | undefined, size: TmdbImgSize): string | null {
  if (!path) return null;
  return `${BASE}/${size}${path}`;
}

/** Tamaño de póster según ajustes de visualización. */
export function posterSizeFor(quality: ImageQuality, card: PosterSize): TmdbImgSize {
  if (card === "sm") {
    if (quality === "low") return "w92";
    if (quality === "high") return "w185";
    return "w154";
  }
  if (card === "lg") {
    if (quality === "low") return "w342";
    if (quality === "high") return "w780";
    return "w500";
  }
  if (quality === "low") return "w185";
  if (quality === "high") return "w500";
  return "w342";
}

/** Backdrop del hero / detalle. */
export function backdropSizeFor(quality: ImageQuality): TmdbImgSize {
  if (quality === "low") return "w780";
  if (quality === "high") return "original";
  return "w1280";
}

/** Ancho CSS aproximado del póster según el ajuste de tamaño. */
export function posterWidthClass(size: PosterSize): string {
  if (size === "sm") return "w-[7.5rem]";
  if (size === "lg") return "w-[13.5rem]";
  return "w-[10.5rem]";
}
