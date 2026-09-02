/**
 * Ficha de serie: temporadas, episodios, ficha técnica y estadísticas.
 */
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getMediaDetails } from "@/lib/tmdb/api";
import { MediaDetailsView } from "@/components/details/media-details";
import { Skeleton } from "@/components/ui/skeleton";
import type { TmdbTvDetails } from "@/lib/tmdb/types";

export const Route = createFileRoute("/tv/$id")({
  loader: async ({ params }) => {
    try {
      return await getMediaDetails({ data: { id: params.id, type: "tv" } });
    } catch (err) {
      const msg = err instanceof Error ? err.message.toLowerCase() : "";
      if (msg.includes("404") || msg.includes("not be found") || msg.includes("not found")) {
        throw notFound();
      }
      throw err;
    }
  },
  head: ({ loaderData }) => {
    const d = loaderData as TmdbTvDetails | undefined;
    const title = d?.name ? `${d.name} · MHD+` : "Serie · MHD+";
    return {
      meta: [
        { title },
        { name: "description", content: d?.overview?.slice(0, 160) || "Ficha de serie en MHD+." },
      ],
    };
  },
  component: TvPage,
  pendingComponent: DetailsPending,
});

function DetailsPending() {
  return (
    <div>
      <Skeleton className="h-72 rounded-none" />
      <div className="mx-auto max-w-[90rem] px-4 py-8">
        <Skeleton className="h-64 w-52" />
      </div>
    </div>
  );
}

function TvPage() {
  const data = Route.useLoaderData() as TmdbTvDetails;
  return <MediaDetailsView data={data} type="tv" />;
}
