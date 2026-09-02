import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DiUu_JO6.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Funciones de servidor (createServerFn) que el cliente llama como RPC.
* El handler corre solo en el servidor: ahí se importa el proxy con la API key.
*/
/** Un solo viaje a TMDb por ficha: créditos, vídeos, galería, similares y extras. */
var APPEND_MEDIA = "credits,videos,images,recommendations,similar,keywords,watch/providers,external_ids,release_dates,content_ratings";
var tmdbGet_createServerFn_handler = createServerRpc({
	id: "db1b98805a964563bd4cdc015c36f5990884b3c6fa7aef04b7fe02367b386f89",
	name: "tmdbGet",
	filename: "src/lib/tmdb/api.ts"
}, (opts) => tmdbGet.__executeServer(opts));
var tmdbGet = createServerFn({ method: "POST" }).validator((d) => d).handler(tmdbGet_createServerFn_handler, async ({ data }) => {
	const { tmdbRequest, stripAdult } = await import("./proxy.server-DqFN8chk.mjs").then((n) => n.n);
	const json = await tmdbRequest(data.path, data.query ?? {});
	if (json && typeof json === "object" && "results" in json) return stripAdult(json, Boolean(data.includeAdult));
	return json;
});
var getHomeFeed_createServerFn_handler = createServerRpc({
	id: "4d68bea93269169e9dc5feecc86d62eae051e203833f258945f0c9d9091fdf7d",
	name: "getHomeFeed",
	filename: "src/lib/tmdb/api.ts"
}, (opts) => getHomeFeed.__executeServer(opts));
var getHomeFeed = createServerFn({ method: "GET" }).validator((d) => d ?? {}).handler(getHomeFeed_createServerFn_handler, async ({ data }) => {
	const { tmdbRequest, stripAdult } = await import("./proxy.server-DqFN8chk.mjs").then((n) => n.n);
	const allow = Boolean(data.includeAdult);
	const take = (list) => stripAdult(list, allow).results.filter((r) => r.poster_path || r.backdrop_path);
	const discover = (genre) => tmdbRequest("/discover/movie", {
		with_genres: genre,
		sort_by: "popularity.desc"
	});
	const [trending, popularMovies, topMovies, upcoming, nowPlaying, popularTv, topTv, onAir, action, comedy, drama, thriller, scifi, horror, animation, romance, movieGenres, tvGenres] = await Promise.all([
		tmdbRequest("/trending/all/week"),
		tmdbRequest("/movie/popular"),
		tmdbRequest("/movie/top_rated"),
		tmdbRequest("/movie/upcoming"),
		tmdbRequest("/movie/now_playing"),
		tmdbRequest("/tv/popular"),
		tmdbRequest("/tv/top_rated"),
		tmdbRequest("/tv/on_the_air"),
		discover(28),
		discover(35),
		discover(18),
		discover(53),
		discover(878),
		discover(27),
		discover(16),
		discover(10749),
		tmdbRequest("/genre/movie/list"),
		tmdbRequest("/genre/tv/list")
	]);
	return {
		trending: take(trending).slice(0, 12),
		popularMovies: take(popularMovies),
		topMovies: take(topMovies),
		upcoming: take(upcoming),
		nowPlaying: take(nowPlaying),
		popularTv: take(popularTv),
		topTv: take(topTv),
		onAir: take(onAir),
		action: take(action),
		comedy: take(comedy),
		drama: take(drama),
		thriller: take(thriller),
		scifi: take(scifi),
		horror: take(horror),
		animation: take(animation),
		romance: take(romance),
		movieGenres: movieGenres.genres,
		tvGenres: tvGenres.genres
	};
});
var getMediaDetails_createServerFn_handler = createServerRpc({
	id: "f32f8193cdcefa03a6f5de0f38cea77dccb54f6cf19dd0dcd082afb8373ecfdc",
	name: "getMediaDetails",
	filename: "src/lib/tmdb/api.ts"
}, (opts) => getMediaDetails.__executeServer(opts));
var getMediaDetails = createServerFn({ method: "GET" }).validator((d) => d).handler(getMediaDetails_createServerFn_handler, async ({ data }) => {
	const { tmdbRequest, trimImages } = await import("./proxy.server-DqFN8chk.mjs").then((n) => n.n);
	const trimmed = trimImages(await tmdbRequest(data.type === "movie" ? `/movie/${data.id}` : `/tv/${data.id}`, {
		append_to_response: APPEND_MEDIA,
		include_image_language: "es,en,null"
	}));
	if (trimmed.recommendations?.results) trimmed.recommendations.results = trimmed.recommendations.results.slice(0, 14);
	if (trimmed.similar?.results) trimmed.similar.results = trimmed.similar.results.slice(0, 14);
	if (trimmed.credits?.cast) trimmed.credits.cast = trimmed.credits.cast.slice(0, 40);
	return trimmed;
});
var getPersonDetails_createServerFn_handler = createServerRpc({
	id: "3011bcbe11cf6eef258f42fd176ebb4fb29c877fba6ada3e4ffa215ba55fc06f",
	name: "getPersonDetails",
	filename: "src/lib/tmdb/api.ts"
}, (opts) => getPersonDetails.__executeServer(opts));
var getPersonDetails = createServerFn({ method: "GET" }).validator((d) => d).handler(getPersonDetails_createServerFn_handler, async ({ data }) => {
	const { tmdbRequest, trimImages } = await import("./proxy.server-DqFN8chk.mjs").then((n) => n.n);
	return trimImages(await tmdbRequest(`/person/${data.id}`, { append_to_response: "combined_credits,images,external_ids" }));
});
var getSeason_createServerFn_handler = createServerRpc({
	id: "d72f6ea609fcef51c84ad23666737587b2e866adebb9f796a3faeed46965eca0",
	name: "getSeason",
	filename: "src/lib/tmdb/api.ts"
}, (opts) => getSeason.__executeServer(opts));
var getSeason = createServerFn({ method: "GET" }).validator((d) => d).handler(getSeason_createServerFn_handler, async ({ data }) => {
	const { tmdbRequest } = await import("./proxy.server-DqFN8chk.mjs").then((n) => n.n);
	return tmdbRequest(`/tv/${data.tvId}/season/${data.season}`);
});
var getCollection_createServerFn_handler = createServerRpc({
	id: "5ed75dab9c0b836cc49278a08c7890650e24ff71da92887e1c745cb884cb97c9",
	name: "getCollection",
	filename: "src/lib/tmdb/api.ts"
}, (opts) => getCollection.__executeServer(opts));
var getCollection = createServerFn({ method: "GET" }).validator((d) => d).handler(getCollection_createServerFn_handler, async ({ data }) => {
	const { tmdbRequest } = await import("./proxy.server-DqFN8chk.mjs").then((n) => n.n);
	return tmdbRequest(`/collection/${data.id}`);
});
var searchMulti_createServerFn_handler = createServerRpc({
	id: "0e4107cd84a4b2686e34dec6399b133c0768ba9a6cf7c08685f52a55eb80490e",
	name: "searchMulti",
	filename: "src/lib/tmdb/api.ts"
}, (opts) => searchMulti.__executeServer(opts));
var searchMulti = createServerFn({ method: "GET" }).validator((d) => d).handler(searchMulti_createServerFn_handler, async ({ data }) => {
	const { tmdbRequest, stripAdult } = await import("./proxy.server-DqFN8chk.mjs").then((n) => n.n);
	return stripAdult(await tmdbRequest("/search/multi", {
		query: data.q,
		include_adult: Boolean(data.includeAdult)
	}), Boolean(data.includeAdult));
});
//#endregion
export { getCollection_createServerFn_handler, getHomeFeed_createServerFn_handler, getMediaDetails_createServerFn_handler, getPersonDetails_createServerFn_handler, getSeason_createServerFn_handler, searchMulti_createServerFn_handler, tmdbGet_createServerFn_handler };
