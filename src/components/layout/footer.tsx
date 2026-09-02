/**
 * Pie con atribución obligatoria a TMDb (logo + disclaimer).
 */
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p>
            <Link to="/" className="font-display text-lg tracking-wide text-fg">
              MHD<span className="text-gold">+</span>
            </Link>
            <span className="ml-2 text-sm text-muted">Tu universo de cine y series.</span>
          </p>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-muted">
            Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
          </p>
        </div>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs text-muted hover:text-cyan"
          aria-label="The Movie Database"
        >
          <TmdbMark />
          <span>Datos por TMDb</span>
        </a>
      </div>
    </footer>
  );
}

/** Marca simplificada de TMDb (cian oficial #00A8E1) para la atribución. */
function TmdbMark() {
  return (
    <svg viewBox="0 0 48 34" className="h-6 w-auto" aria-hidden="true">
      <rect width="48" height="34" rx="6" fill="#00A8E1" />
      <text
        x="24"
        y="22"
        textAnchor="middle"
        fill="#0a0a0a"
        fontSize="11"
        fontWeight="800"
        fontFamily="Manrope, system-ui, sans-serif"
      >
        TMDb
      </text>
    </svg>
  );
}
