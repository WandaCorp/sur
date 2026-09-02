/**
 * Función serverless de proxy TMDb.
 * Ruta: GET /api/tmdb/<path>?query...
 * Ejemplo: /api/tmdb/movie/popular?page=1
 *
 * En Vercel esto se despliega como Serverless Function (Nitro preset).
 * La API key se lee de TMDB_API_KEY — nunca viaja al cliente.
 */
import { createFileRoute } from "@tanstack/react-router";
import { tmdbRequest, TmdbHttpError } from "@/lib/tmdb/proxy.server";

export const Route = createFileRoute("/api/tmdb/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        try {
          const splat = (params as { _splat?: string })._splat || "";
          const path = `/${splat}`.replace(/\/+/g, "/");
          if (path === "/") {
            return Response.json(
              { error: "Indica un endpoint de TMDb, p. ej. /api/tmdb/movie/popular" },
              { status: 400 },
            );
          }
          const url = new URL(request.url);
          const query: Record<string, string> = {};
          url.searchParams.forEach((v, k) => {
            if (k !== "api_key") query[k] = v;
          });
          const data = await tmdbRequest(path, query);
          return Response.json(data, {
            headers: {
              "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
            },
          });
        } catch (err) {
          const status = err instanceof TmdbHttpError && err.status ? err.status : 502;
          const message = err instanceof Error ? err.message : "Error de conexión con TMDb";
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
