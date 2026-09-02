/**
 * Slider hero automático y manual, con swipe táctil y teclado.
 * Pausa el autoplay al hover, al cambiar de pestaña o si hay reduced-motion.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { TmdbMedia } from "@/lib/tmdb/types";
import { formatYear, mediaDate, mediaTitle, mediaTypeOf } from "@/lib/format";
import { backdropSizeFor, tmdbImg } from "@/lib/tmdb/images";
import { useSettings } from "@/lib/stores/settings";
import { RatingBadge } from "./rating-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INTERVAL = 6500;

export function HeroCarousel({ items }: { items: TmdbMedia[] }) {
  const quality = useSettings((s) => s.imageQuality);
  const slides = items.filter((i) => i.backdrop_path).slice(0, 8);
  const [index, setIndex] = useState(0);
  const [hoverPause, setHoverPause] = useState(false);
  const [hiddenPause, setHiddenPause] = useState(false);
  const reduceRef = useRef(false);
  const startX = useRef(0);
  const deltaX = useRef(0);

  const len = slides.length;
  const go = useCallback(
    (dir: number) => {
      if (!len) return;
      setIndex((i) => (i + dir + len) % len);
    },
    [len],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;
    const onMq = () => {
      reduceRef.current = mq.matches;
    };
    mq.addEventListener("change", onMq);
    const onVis = () => setHiddenPause(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (hoverPause || hiddenPause || len < 2 || reduceRef.current) return;
    const id = window.setInterval(() => go(1), INTERVAL);
    return () => window.clearInterval(id);
  }, [hoverPause, hiddenPause, len, go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!slides.length) return null;
  const current = slides[index]!;
  const kind = mediaTypeOf(current);
  const to = kind === "tv" ? "/tv/$id" : "/movie/$id";

  return (
    <section
      className="relative h-[min(88vh,42rem)] w-full overflow-hidden bg-bg"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      onTouchStart={(e) => {
        startX.current = e.touches[0]?.clientX ?? 0;
        deltaX.current = 0;
        setHoverPause(true);
      }}
      onTouchMove={(e) => {
        deltaX.current = (e.touches[0]?.clientX ?? 0) - startX.current;
      }}
      onTouchEnd={() => {
        if (deltaX.current > 50) go(-1);
        else if (deltaX.current < -50) go(1);
        setHoverPause(false);
      }}
    >
      {slides.map((slide, i) => {
        const src = tmdbImg(slide.backdrop_path, backdropSizeFor(quality));
        return (
          <div
            key={slide.id}
            className={cn("hero-slide", i === index && "is-active")}
            aria-hidden={i !== index}
          >
            {src ? (
              <img
                src={src}
                alt=""
                className="size-full object-cover"
                fetchPriority={i === 0 ? "high" : "low"}
              />
            ) : null}
            <div className="hero-overlay absolute inset-0" />
          </div>
        );
      })}

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-16 sm:px-8 md:px-12 lg:pb-20">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
          Destacado
        </p>
        <h1 className="max-w-3xl font-display text-5xl leading-none tracking-wide sm:text-6xl md:text-7xl">
          {mediaTitle(current)}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
          <RatingBadge value={current.vote_average} size="lg" />
          <span>{formatYear(mediaDate(current))}</span>
          <span className="uppercase">{kind === "tv" ? "Serie" : "Película"}</span>
        </div>
        <p className="mt-4 max-w-xl line-clamp-3 text-sm leading-relaxed text-fg/85 sm:text-base">
          {current.overview || "Sin sinopsis disponible."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to={to} params={{ id: String(current.id) }}>
              <Play className="size-4 fill-current" /> Ver ficha
            </Link>
          </Button>
        </div>
      </div>

      {len > 1 ? (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-fg hover:bg-black/70 md:flex"
            onClick={() => go(-1)}
            aria-label="Anterior"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-fg hover:bg-black/70 md:flex"
            onClick={() => go(1)}
            aria-label="Siguiente"
          >
            <ChevronRight className="size-6" />
          </button>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300",
                  i === index ? "w-8 bg-gold" : "w-2.5 bg-fg/40 hover:bg-fg/70",
                )}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
