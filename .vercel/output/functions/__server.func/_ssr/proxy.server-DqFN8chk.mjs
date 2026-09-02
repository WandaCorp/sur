//#region node_modules/.nitro/vite/services/ssr/assets/proxy.server-DqFN8chk.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var proxy_server_exports = /* @__PURE__ */ __exportAll({
	TmdbHttpError: () => TmdbHttpError,
	stripAdult: () => stripAdult,
	tmdbRequest: () => tmdbRequest,
	trimImages: () => trimImages
});
var TMDB_BASE = "https://api.themoviedb.org/3";
/** Fallback solo para el preview local. En Vercel hay que definir TMDB_API_KEY. */
var FALLBACK_KEY = "692a43c4c264e6dd28bff9f69c0fa8eb";
var WINDOW_MS = 1e4;
var MAX_REQ = 35;
var CACHE_TTL_MS = 3e5;
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
var stamps = [];
function apiKey() {
	return process.env.TMDB_API_KEY || process.env.TMDB_KEY || FALLBACK_KEY;
}
function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}
/** Espera si vamos a superar el cupo de TMDb. */
async function acquireSlot() {
	const now = Date.now();
	stamps = stamps.filter((t) => now - t < WINDOW_MS);
	if (stamps.length >= MAX_REQ) {
		const wait = WINDOW_MS - (now - stamps[0]) + 30;
		await sleep(Math.max(wait, 50));
		return acquireSlot();
	}
	stamps.push(Date.now());
}
var TmdbHttpError = class extends Error {
	status;
	code;
	constructor(status, message, code) {
		super(message);
		this.name = "TmdbHttpError";
		this.status = status;
		this.code = code;
	}
};
/**
* Petición genérica a TMDb. `path` empieza por "/" (ej. "/movie/popular").
* Siempre añade language=es-ES salvo que el caller lo pise.
*/
async function tmdbRequest(path, query = {}) {
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	const url = new URL(`${TMDB_BASE}${cleanPath}`);
	url.searchParams.set("api_key", apiKey());
	url.searchParams.set("language", "es-ES");
	for (const [k, v] of Object.entries(query)) {
		if (v === void 0 || v === "") continue;
		url.searchParams.set(k, String(v));
	}
	const cacheKey = url.toString();
	const hit = cache.get(cacheKey);
	if (hit && hit.expires > Date.now()) return hit.data;
	const pending = inflight.get(cacheKey);
	if (pending) return pending;
	const job = (async () => {
		await acquireSlot();
		try {
			const res = await fetch(url, { headers: { Accept: "application/json" } });
			const json = await res.json();
			if (!res.ok) throw new TmdbHttpError(res.status, json.status_message || `Error TMDb ${res.status}`, json.status_code);
			cache.set(cacheKey, {
				expires: Date.now() + CACHE_TTL_MS,
				data: json
			});
			return json;
		} catch (err) {
			if (err instanceof TmdbHttpError) throw err;
			throw new TmdbHttpError(0, err instanceof Error ? err.message : "Error de conexión con TMDb");
		} finally {
			inflight.delete(cacheKey);
		}
	})();
	inflight.set(cacheKey, job);
	return job;
}
/** Recorta galerías para no inflar el payload hacia el cliente. */
function trimImages(data) {
	if (!data.images) return data;
	if (data.images.backdrops) data.images.backdrops = data.images.backdrops.slice(0, 24);
	if (data.images.posters) data.images.posters = data.images.posters.slice(0, 16);
	if (data.images.profiles) data.images.profiles = data.images.profiles.slice(0, 20);
	return data;
}
/** Filtra resultados marcados como adultos si el usuario no los activó. */
function stripAdult(data, allow) {
	if (allow || !data.results) return data;
	data.results = data.results.filter((r) => !r.adult);
	return data;
}
//#endregion
export { __exportAll as i, proxy_server_exports as n, tmdbRequest as r, TmdbHttpError as t };
