/**
 * Alterna un título en favoritos (localStorage) y muestra un toast.
 */
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFavorites, type FavoriteItem } from "@/lib/stores/favorites";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export function FavoriteButton({ item }: { item: Omit<FavoriteItem, "addedAt"> }) {
  const hydrated = useHydrated();
  const has = useFavorites((s) => s.has(item.id, item.mediaType));
  const toggle = useFavorites((s) => s.toggle);
  const active = hydrated && has;

  return (
    <Button
      variant={active ? "default" : "outline"}
      onClick={() => {
        const added = toggle(item);
        toast.success(added ? "Agregado a favoritos" : "Eliminado de favoritos");
      }}
      aria-pressed={active}
    >
      <Heart className={cn("size-4", active && "fill-current")} />
      {active ? "En favoritos" : "Favorito"}
    </Button>
  );
}
