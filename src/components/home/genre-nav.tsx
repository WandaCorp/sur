/**
 * Navegación interna por géneros: chips que llevan al catálogo filtrado.
 * Conmuta entre géneros de películas y de series.
 */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { TmdbGenre } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

export function GenreNav({
  movieGenres,
  tvGenres,
}: {
  movieGenres: TmdbGenre[];
  tvGenres: TmdbGenre[];
}) {
  const [kind, setKind] = useState<"movie" | "tv">("movie");
  const genres = kind === "tv" ? tvGenres : movieGenres;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl tracking-wide md:text-3xl">Categorías</h2>
        <div className="flex rounded-full border border-border p-0.5" role="group" aria-label="Tipo de categoría">
          <button
            type="button"
            onClick={() => setKind("movie")}
            className={cn(
              "h-9 rounded-full px-4 text-sm",
              kind === "movie" ? "bg-gold text-gold-fg" : "text-muted hover:text-fg",
            )}
            aria-pressed={kind === "movie"}
          >
            Películas
          </button>
          <button
            type="button"
            onClick={() => setKind("tv")}
            className={cn(
              "h-9 rounded-full px-4 text-sm",
              kind === "tv" ? "bg-gold text-gold-fg" : "text-muted hover:text-fg",
            )}
            aria-pressed={kind === "tv"}
          >
            Series
          </button>
        </div>
      </div>
      <nav aria-label="Categorías" className="row-fade">
        <div className="row-scroll gap-2">
          {genres.map((g) => (
            <Link
              key={`${kind}-${g.id}`}
              to="/catalog"
              search={{ type: kind, genre: String(g.id) }}
              className="inline-flex h-10 shrink-0 items-center rounded-full border border-border px-4 text-sm text-muted transition-colors hover:border-gold hover:text-gold"
            >
              {g.name}
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
