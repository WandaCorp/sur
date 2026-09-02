/**
 * Ajustes de visualización persistidos en localStorage.
 * Controlan secciones visibles, orden, calidad de imagen, tamaño de pósters
 * y el interruptor de contenido adulto.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ImageQuality = "low" | "medium" | "high";
export type PosterSize = "sm" | "md" | "lg";
export type HomeSort = "popularity" | "date" | "rating";

export const HOME_SECTIONS = [
  { id: "trending", label: "En tendencia" },
  { id: "popularMovies", label: "Películas populares" },
  { id: "topMovies", label: "Mejor valoradas" },
  { id: "nowPlaying", label: "En cines" },
  { id: "upcoming", label: "Próximos estrenos" },
  { id: "popularTv", label: "Series populares" },
  { id: "topTv", label: "Series mejor valoradas" },
  { id: "onAir", label: "En emisión" },
  { id: "action", label: "Acción" },
  { id: "comedy", label: "Comedia" },
  { id: "drama", label: "Drama" },
  { id: "thriller", label: "Thriller" },
  { id: "scifi", label: "Ciencia ficción" },
  { id: "horror", label: "Terror" },
  { id: "animation", label: "Animación" },
  { id: "romance", label: "Romance" },
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number]["id"];

interface SettingsState {
  hiddenSections: HomeSectionId[];
  sort: HomeSort;
  imageQuality: ImageQuality;
  posterSize: PosterSize;
  includeAdult: boolean;
  toggleSection: (id: HomeSectionId) => void;
  setSort: (sort: HomeSort) => void;
  setImageQuality: (q: ImageQuality) => void;
  setPosterSize: (s: PosterSize) => void;
  setIncludeAdult: (v: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      hiddenSections: [],
      sort: "popularity",
      imageQuality: "medium",
      posterSize: "md",
      includeAdult: false,
      toggleSection: (id) =>
        set((s) => ({
          hiddenSections: s.hiddenSections.includes(id)
            ? s.hiddenSections.filter((x) => x !== id)
            : [...s.hiddenSections, id],
        })),
      setSort: (sort) => set({ sort }),
      setImageQuality: (imageQuality) => set({ imageQuality }),
      setPosterSize: (posterSize) => set({ posterSize }),
      setIncludeAdult: (includeAdult) => set({ includeAdult }),
    }),
    { name: "mhd-settings" },
  ),
);
