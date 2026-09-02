/**
 * Favoritos con CRUD en localStorage (sin base de datos).
 * Persistencia entre sesiones mediante zustand/persist.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MediaType } from "@/lib/tmdb/types";

export interface FavoriteItem {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  year?: string;
  addedAt: number;
}

interface FavoritesState {
  items: FavoriteItem[];
  add: (item: Omit<FavoriteItem, "addedAt">) => void;
  remove: (id: number, mediaType: MediaType) => void;
  toggle: (item: Omit<FavoriteItem, "addedAt">) => boolean;
  has: (id: number, mediaType: MediaType) => boolean;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          if (s.items.some((x) => x.id === item.id && x.mediaType === item.mediaType)) {
            return s;
          }
          return { items: [{ ...item, addedAt: Date.now() }, ...s.items] };
        }),
      remove: (id, mediaType) =>
        set((s) => ({
          items: s.items.filter((x) => !(x.id === id && x.mediaType === mediaType)),
        })),
      toggle: (item) => {
        const exists = get().has(item.id, item.mediaType);
        if (exists) get().remove(item.id, item.mediaType);
        else get().add(item);
        return !exists;
      },
      has: (id, mediaType) =>
        get().items.some((x) => x.id === id && x.mediaType === mediaType),
      clear: () => set({ items: [] }),
    }),
    { name: "mhd-favorites" },
  ),
);
