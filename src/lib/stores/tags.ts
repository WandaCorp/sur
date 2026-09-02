/**
 * Sistema de etiquetado local: Buena / Regular / Mala.
 * La clave es `${mediaType}:${id}` para no mezclar película y serie con el mismo id.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MediaType } from "@/lib/tmdb/types";

export type UserTag = "buena" | "regular" | "mala";

export const TAG_META: Record<UserTag, { label: string; emoji: string; hint: string }> = {
  buena: { label: "Buena", emoji: "😊", hint: "Te gustó" },
  regular: { label: "Regular", emoji: "😐", hint: "Ni fu ni fa" },
  mala: { label: "Mala", emoji: "😞", hint: "No te convenció" },
};

function keyOf(id: number, mediaType: MediaType) {
  return `${mediaType}:${id}`;
}

interface TagsState {
  tags: Record<string, UserTag>;
  setTag: (id: number, mediaType: MediaType, tag: UserTag | null) => void;
  getTag: (id: number, mediaType: MediaType) => UserTag | undefined;
}

export const useTags = create<TagsState>()(
  persist(
    (set, get) => ({
      tags: {},
      setTag: (id, mediaType, tag) =>
        set((s) => {
          const next = { ...s.tags };
          const k = keyOf(id, mediaType);
          if (!tag) delete next[k];
          else next[k] = tag;
          return { tags: next };
        }),
      getTag: (id, mediaType) => get().tags[keyOf(id, mediaType)],
    }),
    { name: "mhd-tags" },
  ),
);
