/**
 * Buscador global con autocompletado (debounce 320ms), teclado y atajo ⌘K.
 */
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Clapperboard, Tv, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { searchMulti } from "@/lib/tmdb/api";
import { useSettings } from "@/lib/stores/settings";
import { mediaTitle, mediaTypeOf, formatYear, mediaDate } from "@/lib/format";
import { tmdbImg } from "@/lib/tmdb/images";
import type { TmdbMedia } from "@/lib/tmdb/types";
import { cn } from "@/lib/utils";

function resultTo(item: TmdbMedia) {
  const kind = mediaTypeOf(item);
  if (kind === "person") return { to: "/person/$id" as const, id: String(item.id) };
  if (kind === "tv") return { to: "/tv/$id" as const, id: String(item.id) };
  return { to: "/movie/$id" as const, id: String(item.id) };
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const debounced = useDebounce(q.trim(), 320);
  const includeAdult = useSettings((s) => s.includeAdult);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["search-multi", debounced, includeAdult],
    queryFn: () => searchMulti({ data: { q: debounced, includeAdult } }),
    enabled: debounced.length >= 2,
  });

  const results = (data?.results ?? []).slice(0, 8);

  useEffect(() => {
    setActive(0);
  }, [debounced, results.length]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function goTo(item: TmdbMedia) {
    const dest = resultTo(item);
    setOpen(false);
    void navigate({ to: dest.to, params: { id: dest.id } });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (open && results[active]) {
      goTo(results[active]!);
      return;
    }
    if (!q.trim()) return;
    setOpen(false);
    void navigate({ to: "/search", search: { q: q.trim() } });
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || debounced.length < 2) {
      if (e.key === "Escape") setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className={compact ? "relative w-full" : "relative w-full max-w-md"}>
      <form onSubmit={submit} role="search">
        <label className="sr-only" htmlFor="global-search">
          Buscar películas, series o personas
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <Input
            id="global-search"
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Buscar títulos, series, personas…"
            autoComplete="off"
            role="combobox"
            aria-expanded={open && debounced.length >= 2}
            aria-controls="search-suggest"
            aria-activedescendant={results[active] ? `suggest-${results[active]!.id}` : undefined}
            className="pl-9 pr-16"
          />
          <kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded border border-border px-1.5 py-0.5 text-[10px] text-subtle sm:inline">
            ⌘K
          </kbd>
        </div>
      </form>
      {open && debounced.length >= 2 ? (
        <ul
          id="search-suggest"
          role="listbox"
          className="absolute z-40 mt-2 w-full overflow-hidden rounded-lg border border-border bg-surface shadow-card"
        >
          {isFetching && !results.length ? (
            <li className="px-3 py-3 text-sm text-muted">Buscando…</li>
          ) : null}
          {results.map((item, i) => {
            const kind = mediaTypeOf(item);
            const dest = resultTo(item);
            const thumb =
              kind === "person"
                ? tmdbImg(item.profile_path, "w92")
                : tmdbImg(item.poster_path, "w92");
            const Icon = kind === "person" ? User : kind === "tv" ? Tv : Clapperboard;
            return (
              <li key={`${kind}-${item.id}`} role="option" id={`suggest-${item.id}`} aria-selected={i === active}>
                <Link
                  to={dest.to}
                  params={{ id: dest.id }}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2",
                    i === active ? "bg-elevated" : "hover:bg-elevated",
                  )}
                >
                  <div className="size-10 shrink-0 overflow-hidden rounded-sm bg-elevated">
                    {thumb ? (
                      <img src={thumb} alt="" className="size-full object-cover" />
                    ) : (
                      <Icon className="m-auto size-4 text-muted" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{mediaTitle(item)}</p>
                    <p className="text-xs text-muted">
                      {kind === "person" ? "Persona" : kind === "tv" ? "Serie" : "Película"}
                      {kind !== "person" && formatYear(mediaDate(item))
                        ? ` · ${formatYear(mediaDate(item))}`
                        : ""}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
          {!isFetching && !results.length ? (
            <li className="px-3 py-3 text-sm text-muted">Sin coincidencias.</li>
          ) : null}
          <li className="border-t border-border">
            <button
              type="button"
              className="w-full px-3 py-2 text-left text-sm text-gold hover:bg-elevated"
              onClick={() => {
                setOpen(false);
                void navigate({ to: "/search", search: { q: debounced } });
              }}
            >
              Ver todos los resultados de “{debounced}”
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
