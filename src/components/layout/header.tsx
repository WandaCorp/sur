/**
 * Cabecera sticky: logo MHD+, navegación, buscador, favoritos y ajustes.
 */
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { SearchBar } from "@/components/search/search-bar";
import { DisplaySettings } from "@/components/home/display-settings";
import { useFavorites } from "@/lib/stores/favorites";
import { useHydrated } from "@/hooks/use-hydrated";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalog", label: "Películas", search: { type: "movie" as const } },
  { to: "/catalog", label: "Series", search: { type: "tv" as const } },
  { to: "/favorites", label: "Favoritos" },
];

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.search });
  const count = useFavorites((s) => s.items.length);
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);

  function isActive(to: string, extra?: { type?: "movie" | "tv" }) {
    if (to === "/") return pathname === "/";
    if (to === "/catalog" && extra?.type) {
      const type = (search as { type?: string }).type;
      return pathname === "/catalog" && (type ?? "movie") === extra.type;
    }
    return pathname === to;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-baseline gap-0.5" aria-label="MHD+ inicio">
          <span className="font-display text-3xl leading-none tracking-wide">MHD</span>
          <span className="font-display text-3xl leading-none text-gold">+</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={item.search}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.to, item.search)
                  ? "text-gold"
                  : "text-muted hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden flex-1 justify-end md:flex md:max-w-md">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Link
            to="/favorites"
            className="relative inline-flex size-11 items-center justify-center rounded-md hover:bg-elevated"
            aria-label="Favoritos"
          >
            <Heart className="size-5" />
            {hydrated && count > 0 ? (
              <span className="absolute top-1.5 right-1.5 min-w-4 rounded-full bg-red px-1 text-center text-[10px] font-bold leading-4">
                {count}
              </span>
            ) : null}
          </Link>
          <DisplaySettings />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <SearchBar compact />
          <nav className="mt-3 flex flex-col" aria-label="Móvil">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-3 text-sm font-medium",
                  isActive(item.to, item.search) ? "text-gold" : "text-fg",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
