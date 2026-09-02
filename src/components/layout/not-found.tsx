/**
 * Página 404 del router.
 */
import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-7xl tracking-widest text-gold">404</p>
      <h1 className="text-xl font-semibold">No encontramos esa ficha</h1>
      <p className="max-w-md text-sm text-muted">
        El título, la persona o la categoría que buscas no existe o se movió.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex h-11 items-center rounded-md bg-gold px-5 text-sm font-semibold text-gold-fg"
      >
        Ir al inicio
      </Link>
    </main>
  );
}
