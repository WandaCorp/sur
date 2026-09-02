/**
 * Ficha de película: loader con append_to_response para una sola ida a TMDb.
 */
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getMediaDetails } from "@/lib/tmdb/api";
import { MediaDetailsView } from "@/components/details/media-details";
import { Skeleton } from "@/components/ui/skeleton";
import type { TmdbMovieDetails } from "@/lib/tmdb/types";

export const Route = createFileRoute("/movie/$id")({
  loader: async ({ params }) => {
    try {
      return await getMediaDetails({ data: { id: params.id, type: "movie" } });
    } catch (err) {
      const msg = err instanceof Error ? err.message.toLowerCase() : "";
      if (msg.includes("404") || msg.includes("not be found") || msg.includes("not found")) {
        throw notFound();
      }
      throw err;
    }
  },
  head: ({ loaderData }) => {
    const d = loaderData as TmdbMovieDetails | undefined;
    const title = d?.title ? `${d.title} · MHD+` : "Película · MHD+";
    return {
      meta: [
        { title },
        { name: "description", content: d?.overview?.slice(0, 160) || "Ficha de película en MHD+." },
      ],
    };
  },
  component: MoviePage,
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

function MoviePage() {
  const data = Route.useLoaderData() as TmdbMovieDetails;
  return <MediaDetailsView data={data} type="movie" />;
}
