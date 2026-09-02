/**
 * Dónde ver: plataformas de streaming / alquiler / compra según TMDb (JustWatch).
 */
import { tmdbImg } from "@/lib/tmdb/images";
import type { TmdbWatchLocale, TmdbWatchProvider } from "@/lib/tmdb/types";

const LABELS: { key: keyof TmdbWatchLocale; label: string }[] = [
  { key: "flatrate", label: "Suscripción" },
  { key: "free", label: "Gratis" },
  { key: "ads", label: "Con anuncios" },
  { key: "rent", label: "Alquiler" },
  { key: "buy", label: "Compra" },
];

function ProviderRow({ items }: { items: TmdbWatchProvider[] }) {
  const unique = items.filter(
    (p, i, arr) => arr.findIndex((x) => x.provider_id === p.provider_id) === i,
  );
  return (
    <ul className="flex flex-wrap gap-2">
      {unique.map((p) => {
        const logo = tmdbImg(p.logo_path, "w92");
        return (
          <li key={p.provider_id} className="flex items-center gap-2 rounded-md bg-elevated px-2 py-1.5">
            {logo ? (
              <img src={logo} alt="" className="size-8 rounded-sm object-cover" loading="lazy" />
            ) : null}
            <span className="text-xs font-medium">{p.provider_name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function WatchProviders({
  region,
  locale,
}: {
  region: string;
  locale: TmdbWatchLocale;
}) {
  const groups = LABELS.filter((g) => {
    const list = locale[g.key];
    return Array.isArray(list) && list.length > 0;
  });
  if (!groups.length) return null;

  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-display text-2xl tracking-wide">Dónde ver</h2>
        <p className="text-xs text-muted">Disponibilidad ({region}) vía JustWatch</p>
      </div>
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.key}>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">{g.label}</p>
            <ProviderRow items={locale[g.key] as TmdbWatchProvider[]} />
          </div>
        ))}
      </div>
      {locale.link ? (
        <a
          href={locale.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-xs text-cyan hover:underline"
        >
          Ver todas las opciones en TMDb
        </a>
      ) : null}
    </section>
  );
}
