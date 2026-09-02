/**
 * Ficha técnica: reparto y equipo (dirección, guion) con enlace a la persona.
 */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import type { TmdbCast } from "@/lib/tmdb/types";
import { tmdbImg } from "@/lib/tmdb/images";
import { Button } from "@/components/ui/button";

function PersonChip({ person, caption }: { person: TmdbCast; caption?: string }) {
  const src = tmdbImg(person.profile_path, "w185");
  return (
    <Link to="/person/$id" params={{ id: String(person.id) }} className="w-28 shrink-0">
      <div className="aspect-[2/3] overflow-hidden rounded-md bg-elevated">
        {src ? (
          <img src={src} alt="" loading="lazy" className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-subtle">
            <User className="size-8" />
          </div>
        )}
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm font-medium">{person.name}</p>
      {caption ? <p className="line-clamp-2 text-xs text-muted">{caption}</p> : null}
    </Link>
  );
}

export function CastCrew({
  cast,
  crew,
}: {
  cast: TmdbCast[];
  crew: TmdbCast[];
}) {
  const [showAll, setShowAll] = useState(false);
  const directors = crew.filter((c) => c.job === "Director");
  const writers = crew.filter(
    (c) => c.department === "Writing" || c.job === "Writer" || c.job === "Screenplay",
  );
  const visible = showAll ? cast : cast.slice(0, 12);

  return (
    <div className="space-y-8">
      {directors.length || writers.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {directors.length ? (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted">Dirección</h3>
              <ul className="space-y-1">
                {directors.map((d) => (
                  <li key={`d-${d.id}-${d.job}`}>
                    <Link to="/person/$id" params={{ id: String(d.id) }} className="hover:text-gold">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {writers.length ? (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted">Guion</h3>
              <ul className="space-y-1">
                {writers.slice(0, 8).map((d) => (
                  <li key={`w-${d.id}-${d.job}`}>
                    <Link to="/person/$id" params={{ id: String(d.id) }} className="hover:text-gold">
                      {d.name}
                    </Link>
                    {d.job ? <span className="text-muted"> · {d.job}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <div>
        <h3 className="mb-3 font-display text-2xl tracking-wide">Reparto</h3>
        {cast.length === 0 ? (
          <p className="text-sm text-muted">Sin datos de reparto.</p>
        ) : (
          <>
            <div className="row-scroll">
              {visible.map((p) => (
                <PersonChip key={`${p.id}-${p.character}`} person={p} caption={p.character} />
              ))}
            </div>
            {cast.length > 12 ? (
              <Button variant="ghost" className="mt-3" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Ver menos" : `Ver todo el reparto (${cast.length})`}
              </Button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
