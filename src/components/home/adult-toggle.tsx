/**
 * Interruptor de contenido adulto con advertencia previa al activarlo.
 */
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
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
import { useSettings } from "@/lib/stores/settings";

export function AdultToggle() {
  const includeAdult = useSettings((s) => s.includeAdult);
  const setIncludeAdult = useSettings((s) => s.setIncludeAdult);
  const [open, setOpen] = useState(false);

  function onChecked(next: boolean) {
    if (next && !includeAdult) {
      setOpen(true);
      return;
    }
    setIncludeAdult(false);
    toast.message("Contenido adulto oculto");
  }

  return (
    <section>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Contenido para adultos</h3>
          <p className="mt-1 text-xs text-muted">
            Oculto por defecto. Al activarlo se muestran títulos marcados como adultos en TMDb.
          </p>
        </div>
        <Switch checked={includeAdult} onCheckedChange={onChecked} aria-label="Mostrar contenido adulto" />
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Mostrar contenido adulto?</AlertDialogTitle>
            <AlertDialogDescription>
              Vas a ver películas y series que TMDb marca como contenido para adultos. Confirma que
              eres mayor de edad y quieres activar esta vista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIncludeAdult(true);
                toast.warning("Contenido adulto visible");
              }}
            >
              Sí, soy mayor de edad
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
