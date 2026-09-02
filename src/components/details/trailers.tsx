/**
 * Lista de videos TMDb con reproducción embebida de YouTube.
 */
import { useState } from "react";
import { Play } from "lucide-react";
import type { TmdbVideo } from "@/lib/tmdb/types";

export function Trailers({ videos }: { videos: TmdbVideo[] }) {
  const yt = videos.filter((v) => v.site === "YouTube");
  const ordered = [
    ...yt.filter((v) => v.type === "Trailer"),
    ...yt.filter((v) => v.type === "Teaser"),
    ...yt.filter((v) => v.type !== "Trailer" && v.type !== "Teaser"),
  ];
  const [current, setCurrent] = useState(ordered[0]?.key ?? null);

  if (!ordered.length) {
    return <p className="text-sm text-muted">No hay trailers disponibles.</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
      <div className="aspect-video overflow-hidden rounded-lg bg-black">
        {current ? (
          <iframe
            title="Trailer"
            src={`https://www.youtube-nocookie.com/embed/${current}?rel=0`}
            className="size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null}
      </div>
      <ul className="flex max-h-[22rem] flex-col gap-2 overflow-y-auto lg:max-h-none">
        {ordered.map((v) => (
          <li key={v.id}>
            <button
              type="button"
              onClick={() => setCurrent(v.key)}
              className="flex w-full items-center gap-3 rounded-md bg-elevated p-2 text-left hover:bg-border"
              aria-current={current === v.key}
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-surface">
                <img
                  src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
                  alt=""
                  className="size-full object-cover"
                  loading="lazy"
                />
                <Play className="absolute inset-0 m-auto size-5 fill-fg text-fg" />
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-sm font-medium">{v.name}</span>
                <span className="text-xs text-muted">{v.type}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
