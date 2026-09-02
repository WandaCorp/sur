/**
 * Colección a la que pertenece una película (p. ej. MCU, Alien).
 */
import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/lib/tmdb/api";
import { MediaRow } from "@/components/media/media-row";
import type { TmdbCollectionRef } from "@/lib/tmdb/types";

export function CollectionRow({ collection }: { collection: TmdbCollectionRef }) {
  const { data, isLoading } = useQuery({
    queryKey: ["collection", collection.id],
    queryFn: () => getCollection({ data: { id: collection.id } }),
  });
  const parts = (data?.parts ?? []).filter((p) => p.poster_path);
  parts.sort((a, b) => (a.release_date || "").localeCompare(b.release_date || ""));

  return (
    <MediaRow
      title={data?.name || collection.name}
      items={parts}
      forceType="movie"
      loading={isLoading}
    />
  );
}
