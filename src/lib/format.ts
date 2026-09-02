/**
 * Formateo de fechas, dinero, duración y títulos para la UI en español.
 */
import type { TmdbMedia } from "@/lib/tmdb/types";

const dateFmt = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const yearFmt = new Intl.DateTimeFormat("es", { year: "numeric" });

const moneyFmt = new Intl.NumberFormat("es", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactFmt = new Intl.NumberFormat("es", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return dateFmt.format(d);
}

export function formatYear(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return yearFmt.format(d);
}

export function formatMoney(value?: number | null): string {
  if (!value) return "—";
  return moneyFmt.format(value);
}

export function formatCompact(value?: number | null): string {
  if (value == null) return "—";
  return compactFmt.format(value);
}

/** Convierte minutos a "2h 18min". */
export function formatRuntime(minutes?: number | null): string {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h <= 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

export function mediaTitle(item: Pick<TmdbMedia, "title" | "name">): string {
  return item.title || item.name || "Sin título";
}

export function mediaDate(item: Pick<TmdbMedia, "release_date" | "first_air_date">): string | undefined {
  return item.release_date || item.first_air_date;
}

export function mediaTypeOf(item: TmdbMedia): "movie" | "tv" | "person" {
  if (item.media_type === "tv" || item.media_type === "person") return item.media_type;
  if (item.media_type === "movie") return "movie";
  if (item.title || item.release_date) return "movie";
  if (item.name || item.first_air_date) return "tv";
  return "movie";
}

/** Color semántico del rating (0–10). */
export function ratingTone(vote: number): "gold" | "cyan" | "muted" | "red" {
  if (vote >= 7.5) return "gold";
  if (vote >= 6) return "cyan";
  if (vote >= 4) return "muted";
  return "red";
}
