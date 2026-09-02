/**
 * Ordena una lista de medios según el ajuste de visualización del usuario.
 */
import type { TmdbMedia } from "@/lib/tmdb/types";
import type { HomeSort } from "@/lib/stores/settings";
import { mediaDate } from "@/lib/format";

export function sortMedia(items: TmdbMedia[], sort: HomeSort): TmdbMedia[] {
  const copy = [...items];
  copy.sort((a, b) => {
    if (sort === "rating") return (b.vote_average || 0) - (a.vote_average || 0);
    if (sort === "date") {
      return (mediaDate(b) || "").localeCompare(mediaDate(a) || "");
    }
    return (b.popularity || 0) - (a.popularity || 0);
  });
  return copy;
}
