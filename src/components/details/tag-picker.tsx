/**
 * Etiquetado local: Buena / Regular / Mala (emoji + texto, persistido).
 */
import { toast } from "sonner";
import { TAG_META, useTags, type UserTag } from "@/lib/stores/tags";
import type { MediaType } from "@/lib/tmdb/types";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

const ORDER: UserTag[] = ["buena", "regular", "mala"];

export function TagPicker({ id, mediaType }: { id: number; mediaType: MediaType }) {
  const hydrated = useHydrated();
  const current = useTags((s) => s.tags[`${mediaType}:${id}`]);
  const setTag = useTags((s) => s.setTag);
  const active = hydrated ? current : undefined;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Tu valoración">
      {ORDER.map((tag) => {
        const meta = TAG_META[tag];
        const on = active === tag;
        return (
          <button
            key={tag}
            type="button"
            title={meta.hint}
            aria-pressed={on}
            onClick={() => {
              setTag(id, mediaType, on ? null : tag);
              toast.success(on ? "Etiqueta quitada" : `Marcada como ${meta.label.toLowerCase()}`);
            }}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border px-3 text-sm transition-colors",
              on ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg",
            )}
          >
            <span aria-hidden="true">{meta.emoji}</span>
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
