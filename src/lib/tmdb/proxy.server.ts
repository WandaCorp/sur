/**
 * Proxy servidor hacia TMDb v3.
 * - La API key NUNCA se envía al navegador: se lee de process.env.TMDB_API_KEY.
 * - Caché en memoria + deduplicación de peticiones inflight.
 * - Cola de rate-limit (~35 req / 10 s) para no saturar la clave de prueba.
 *
 * Variable de entorno en Vercel: TMDB_API_KEY
 * (sin prefijo VITE_, para que no se filtre al cliente).
 */
import type { TmdbErrorBody } from "./types";

const TMDB_BASE = "https://api.themoviedb.org/3";

/** Fallback solo para el preview local. En Vercel hay que definir TMDB_API_KEY. */
const FALLBACK_KEY = "692a43c4c264e6dd28bff9f69c0fa8eb";

const WINDOW_MS = 10_000;
const MAX_REQ = 35;
const CACHE_TTL_MS = 5 * 60 * 1000;

const cache = new Map<string, { expires: number; data: unknown }>();
const inflight = new Map<string, Promise<unknown>>();
let stamps: number[] = [];

function apiKey(): string {
  return process.env.TMDB_API_KEY || process.env.TMDB_KEY || FALLBACK_KEY;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Espera si vamos a superar el cupo de TMDb. */
async function acquireSlot() {
  const now = Date.now();
  stamps = stamps.filter((t) => now - t < WINDOW_MS);
  if (stamps.length >= MAX_REQ) {
    const wait = WINDOW_MS - (now - stamps[0]!) + 30;
    await sleep(Math.max(wait, 50));
    return acquireSlot();
  }
  stamps.push(Date.now());
}

export class TmdbHttpError extends Error {
  status: number;
  code?: number;
  constructor(status: number, message: string, code?: number) {
    super(message);
    this.name = "TmdbHttpError";
    this.status = status;
    this.code = code;
  }
}

export interface TmdbQuery {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Petición genérica a TMDb. `path` empieza por "/" (ej. "/movie/popular").
 * Siempre añade language=es-ES salvo que el caller lo pise.
 */
export async function tmdbRequest<T = unknown>(
  path: string,
  query: TmdbQuery = {},
): Promise<T> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${TMDB_BASE}${cleanPath}`);
  url.searchParams.set("api_key", apiKey());
  url.searchParams.set("language", "es-ES");
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === "") continue;
    url.searchParams.set(k, String(v));
  }

  const cacheKey = url.toString();
  const hit = cache.get(cacheKey);
  if (hit && hit.expires > Date.now()) {
    return hit.data as T;
  }

  const pending = inflight.get(cacheKey);
  if (pending) return pending as Promise<T>;

  const job = (async () => {
    await acquireSlot();
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });
      const json = (await res.json()) as T & TmdbErrorBody;
      if (!res.ok) {
        throw new TmdbHttpError(
          res.status,
          json.status_message || `Error TMDb ${res.status}`,
          json.status_code,
        );
      }
      cache.set(cacheKey, { expires: Date.now() + CACHE_TTL_MS, data: json });
      return json;
    } catch (err) {
      if (err instanceof TmdbHttpError) throw err;
      const message = err instanceof Error ? err.message : "Error de conexión con TMDb";
      throw new TmdbHttpError(0, message);
    } finally {
      inflight.delete(cacheKey);
    }
  })();

  inflight.set(cacheKey, job);
  return job as Promise<T>;
}

/** Recorta galerías para no inflar el payload hacia el cliente. */
export function trimImages<T extends { images?: { backdrops?: unknown[]; posters?: unknown[]; profiles?: unknown[] } }>(
  data: T,
): T {
  if (!data.images) return data;
  if (data.images.backdrops) data.images.backdrops = data.images.backdrops.slice(0, 24);
  if (data.images.posters) data.images.posters = data.images.posters.slice(0, 16);
  if (data.images.profiles) data.images.profiles = data.images.profiles.slice(0, 20);
  return data;
}

/** Filtra resultados marcados como adultos si el usuario no los activó. */
export function stripAdult<T extends { results?: Array<{ adult?: boolean }> }>(
  data: T,
  allow: boolean,
): T {
  if (allow || !data.results) return data;
  data.results = data.results.filter((r) => !r.adult);
  return data;
}
