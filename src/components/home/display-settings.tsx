/**
 * Panel de ajustes de visualización: secciones, orden, calidad, pósters y adultos.
 */
import { Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  HOME_SECTIONS,
  useSettings,
  type HomeSort,
  type ImageQuality,
  type PosterSize,
} from "@/lib/stores/settings";
import { AdultToggle } from "./adult-toggle";
import { cn } from "@/lib/utils";

const SORTS: { id: HomeSort; label: string }[] = [
  { id: "popularity", label: "Popularidad" },
  { id: "date", label: "Fecha" },
  { id: "rating", label: "Rating" },
];

const QUALITY: { id: ImageQuality; label: string }[] = [
  { id: "low", label: "Baja" },
  { id: "medium", label: "Media" },
  { id: "high", label: "Alta" },
];

const SIZES: { id: PosterSize; label: string }[] = [
  { id: "sm", label: "S" },
  { id: "md", label: "M" },
  { id: "lg", label: "L" },
];

export function DisplaySettings({ triggerClassName }: { triggerClassName?: string }) {
  const hidden = useSettings((s) => s.hiddenSections);
  const toggleSection = useSettings((s) => s.toggleSection);
  const sort = useSettings((s) => s.sort);
  const setSort = useSettings((s) => s.setSort);
  const imageQuality = useSettings((s) => s.imageQuality);
  const setImageQuality = useSettings((s) => s.setImageQuality);
  const posterSize = useSettings((s) => s.posterSize);
  const setPosterSize = useSettings((s) => s.setPosterSize);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={triggerClassName} aria-label="Ajustes de visualización">
          <Settings className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent title="Ajustes" side="right">
        <div className="space-y-6">
          <section>
            <h3 className="mb-3 text-sm font-semibold">Secciones del inicio</h3>
            <ul className="space-y-3">
              {HOME_SECTIONS.map((sec) => (
                <li key={sec.id} className="flex items-center justify-between gap-3">
                  <label htmlFor={`sec-${sec.id}`} className="text-sm">
                    {sec.label}
                  </label>
                  <Switch
                    id={`sec-${sec.id}`}
                    checked={!hidden.includes(sec.id)}
                    onCheckedChange={() => toggleSection(sec.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
          <Separator />
          <section>
            <h3 className="mb-3 text-sm font-semibold">Ordenar filas por</h3>
            <div className="flex flex-wrap gap-2">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSort(s.id)}
                  className={cn(
                    "h-9 rounded-full border px-3 text-sm",
                    sort === s.id
                      ? "border-gold bg-gold text-gold-fg"
                      : "border-border text-muted hover:text-fg",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-semibold">Calidad de imagen</h3>
            <div className="flex flex-wrap gap-2">
              {QUALITY.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setImageQuality(q.id)}
                  className={cn(
                    "h-9 rounded-full border px-3 text-sm",
                    imageQuality === q.id
                      ? "border-gold bg-gold text-gold-fg"
                      : "border-border text-muted hover:text-fg",
                  )}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h3 className="mb-3 text-sm font-semibold">Tamaño de pósters</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setPosterSize(q.id)}
                  className={cn(
                    "h-9 min-w-11 rounded-full border px-3 text-sm",
                    posterSize === q.id
                      ? "border-gold bg-gold text-gold-fg"
                      : "border-border text-muted hover:text-fg",
                  )}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </section>
          <Separator />
          <AdultToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
