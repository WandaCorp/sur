/**
 * Galería de backdrops y pósters con lightbox (teclado y botones).
 */
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TmdbImage } from "@/lib/tmdb/types";
import { tmdbImg } from "@/lib/tmdb/images";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function ImageGallery({
  backdrops,
  posters,
}: {
  backdrops: TmdbImage[];
  posters: TmdbImage[];
}) {
  const shots = [
    ...backdrops.map((i) => ({ ...i, kind: "backdrop" as const })),
    ...posters.map((i) => ({ ...i, kind: "poster" as const })),
  ];
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + shots.length) % shots.length);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shots.length]);

  if (!shots.length) {
    return <p className="text-sm text-muted">No hay imágenes disponibles.</p>;
  }

  const current = shots[idx]!;
  const full = tmdbImg(current.file_path, "original");

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {shots.slice(0, 12).map((img, i) => {
          const src = tmdbImg(img.file_path, img.kind === "poster" ? "w342" : "w780");
          return (
            <button
              key={img.file_path + i}
              type="button"
              className={cn(
                "overflow-hidden rounded-md bg-elevated",
                img.kind === "poster" ? "aspect-[2/3]" : "aspect-video",
              )}
              onClick={() => {
                setIdx(i);
                setOpen(true);
              }}
              aria-label={`Abrir imagen ${i + 1}`}
            >
              {src ? (
                <img src={src} alt="" loading="lazy" className="size-full object-cover" />
              ) : null}
            </button>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showClose
          className="w-[min(96vw,72rem)] max-w-none border-0 bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">
            Imagen {idx + 1} de {shots.length}
          </DialogTitle>
          <div className="relative flex items-center justify-center">
            {full ? (
              <img
                src={full}
                alt=""
                className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
              />
            ) : null}
            {shots.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-2 size-11 rounded-full bg-black/60 text-fg"
                  aria-label="Anterior"
                  onClick={() => setIdx((i) => (i - 1 + shots.length) % shots.length)}
                >
                  <ChevronLeft className="mx-auto size-6" />
                </button>
                <button
                  type="button"
                  className="absolute right-2 size-11 rounded-full bg-black/60 text-fg"
                  aria-label="Siguiente"
                  onClick={() => setIdx((i) => (i + 1) % shots.length)}
                >
                  <ChevronRight className="mx-auto size-6" />
                </button>
              </>
            ) : null}
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs tabular-nums">
              {idx + 1} / {shots.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
