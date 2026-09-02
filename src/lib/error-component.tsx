/**
 * Pantalla de error por defecto del router.
 * Mantiene error.message visible (contrato del scaffold).
 */
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg">
      <span className="text-red" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-4xl tracking-wide">Algo salió mal</h1>
      <p className="max-w-md text-sm break-words text-muted">
        {error.message || "Ocurrió un error inesperado. Recarga la página o inténtalo más tarde."}
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex h-11 items-center rounded-md bg-gold px-5 text-sm font-semibold text-gold-fg transition-transform duration-150 active:scale-[0.96]"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
