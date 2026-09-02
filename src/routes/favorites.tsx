/**
 * Página de favoritos: listar, filtrar, quitar y persistir en localStorage.
 */
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Heart, Trash2 } from "lucide-react";
import { useFavorites } from "@/lib/stores/favorites";
import { TAG_META, useTags } from "@/lib/stores/tags";
import { useHydrated } from "@/hooks/use-hydrated";
import { tmdbImg } from "@/lib/tmdb/images";
import { RatingBadge } from "@/components/media/rating-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
  head: () => ({
    meta: [
      { title: "Favoritos · MHD+" },
      { name: "description", content: "Tu lista de películas y series favoritas, guardada en este dispositivo." },
    ],
  }),
});

type Filter = "all" | "movie" | "tv";

function FavoritesPage() {
  const hydrated = useHydrated();
  const items = useFavorites((s) => s.items);
  const remove = useFavorites((s) => s.remove);
  const clear = useFavorites((s) => s.clear);
  const tags = useTags((s) => s.tags);
  const [filter, setFilter] = useState<Filter>("all");
  const [confirm, setConfirm] = useState(false);

  const visible = filter === "all" ? items : items.filter((i) => i.mediaType === filter);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[90rem] px-4 py-8">
        <Skeleton className="h-10 w-48" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Tu lista</p>
          <h1 className="font-display text-4xl tracking-wide">Favoritos</h1>
          <p className="mt-1 text-sm text-muted">{items.length} títulos en este dispositivo</p>
        </div>
        {items.length ? (
          <Button variant="outline" onClick={() => setConfirm(true)}>
            <Trash2 className="size-4" /> Vaciar
          </Button>
        ) : null}
      </div>

      {items.length ? (
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar favoritos">
          {(
            [
              ["all", "Todos"],
              ["movie", "Películas"],
              ["tv", "Series"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm",
                filter === id ? "border-gold bg-gold text-gold-fg" : "border-border text-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <Heart className="size-10 text-subtle" />
          <p className="mt-3 text-sm text-muted">Aún no has guardado nada. Explora el catálogo y toca Favorito.</p>
          <Button asChild className="mt-4">
            <Link to="/catalog" search={{ type: "movie" }}>
              Ir al catálogo
            </Link>
          </Button>
        </div>
      ) : visible.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No hay títulos de este tipo en tu lista.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => {
            const to = item.mediaType === "tv" ? "/tv/$id" : "/movie/$id";
            const poster = tmdbImg(item.posterPath, "w185");
            const tag = tags[`${item.mediaType}:${item.id}`];
            const meta = tag ? TAG_META[tag] : null;
            return (
              <li
                key={`${item.mediaType}-${item.id}`}
                className="flex gap-3 rounded-xl border border-border bg-surface p-3"
              >
                <Link to={to} params={{ id: String(item.id) }} className="h-24 w-16 shrink-0 overflow-hidden rounded-md bg-elevated">
                  {poster ? <img src={poster} alt="" className="size-full object-cover" /> : null}
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={to} params={{ id: String(item.id) }} className="font-medium hover:text-gold">
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted">
                    {item.mediaType === "tv" ? "Serie" : "Película"}
                    {item.year ? ` · ${item.year}` : ""}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <RatingBadge value={item.voteAverage} />
                    {meta ? (
                      <span className="text-xs text-muted">
                        <span aria-hidden="true">{meta.emoji}</span> {meta.label}
                      </span>
                    ) : null}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Quitar ${item.title}`}
                  onClick={() => {
                    remove(item.id, item.mediaType);
                    toast.success("Eliminado de favoritos");
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Vaciar favoritos?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminarán {items.length} títulos de este dispositivo. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clear();
                toast.success("Lista vaciada");
              }}
            >
              Vaciar lista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
