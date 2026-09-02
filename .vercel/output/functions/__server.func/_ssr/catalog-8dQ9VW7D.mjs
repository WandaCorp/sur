import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery, t as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { D as PosterSkeleton, E as useSettings, T as tmdbGet, j as cn, o as Route$6, y as Input } from "./router-CDLma6dh.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, o as useInfiniteScroll, r as SelectItem, t as Select } from "./select-DP3us_Em.mjs";
import { t as PosterCard } from "./poster-card-Cu5MWpcC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-8dQ9VW7D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Catálogo por categoría con infinite scroll y filtros de orden / año / tipo.
*/
var SORTS_MOVIE = [
	{
		id: "popularity.desc",
		label: "Popularidad"
	},
	{
		id: "vote_average.desc",
		label: "Rating"
	},
	{
		id: "primary_release_date.desc",
		label: "Estreno"
	},
	{
		id: "original_title.asc",
		label: "Título"
	}
];
var SORTS_TV = [
	{
		id: "popularity.desc",
		label: "Popularidad"
	},
	{
		id: "vote_average.desc",
		label: "Rating"
	},
	{
		id: "first_air_date.desc",
		label: "Estreno"
	},
	{
		id: "original_name.asc",
		label: "Título"
	}
];
function CatalogPage() {
	const search = Route$6.useSearch();
	const navigate = useNavigate({ from: "/catalog" });
	const type = search.type ?? "movie";
	const includeAdult = useSettings((s) => s.includeAdult);
	const sorts = type === "tv" ? SORTS_TV : SORTS_MOVIE;
	const sort = search.sort ?? "popularity.desc";
	const genresQuery = useQuery({
		queryKey: ["genres", type],
		queryFn: () => tmdbGet({ data: { path: type === "tv" ? "/genre/tv/list" : "/genre/movie/list" } })
	});
	const discover = useInfiniteQuery({
		queryKey: [
			"discover",
			type,
			search.genre,
			sort,
			search.year,
			includeAdult
		],
		initialPageParam: 1,
		queryFn: async ({ pageParam }) => {
			const query = {
				page: pageParam,
				sort_by: sort,
				include_adult: includeAdult,
				"vote_count.gte": sort.startsWith("vote_average") ? 80 : void 0
			};
			if (search.genre) query.with_genres = search.genre;
			if (search.year) {
				if (type === "tv") query.first_air_date_year = search.year;
				else query.primary_release_year = search.year;
			}
			return tmdbGet({ data: {
				path: `/discover/${type}`,
				query,
				includeAdult
			} });
		},
		getNextPageParam: (last) => last.page < last.total_pages && last.page < 500 ? last.page + 1 : void 0
	});
	const items = (0, import_react.useMemo)(() => discover.data?.pages.flatMap((p) => p.results) ?? [], [discover.data]);
	const sentinel = useInfiniteScroll(() => {
		if (discover.hasNextPage && !discover.isFetchingNextPage) discover.fetchNextPage();
	}, Boolean(discover.hasNextPage));
	const genres = genresQuery.data?.genres ?? [];
	const activeGenre = genres.find((g) => String(g.id) === search.genre);
	const kindLabel = type === "tv" ? "Series" : "Películas";
	const title = search.genre ? activeGenre ? `${activeGenre.name} · ${kindLabel}` : kindLabel : type === "tv" ? "Todas las series" : "Todas las películas";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[90rem] px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.2em] text-gold uppercase",
				children: "Catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl tracking-wide sm:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog",
					search: {
						type: "movie",
						sort,
						year: search.year
					},
					className: cn("h-10 rounded-full border px-4 text-sm leading-10", type === "movie" ? "border-gold bg-gold text-gold-fg" : "border-border text-muted"),
					children: "Películas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog",
					search: {
						type: "tv",
						sort,
						year: search.year
					},
					className: cn("h-10 rounded-full border px-4 text-sm leading-10", type === "tv" ? "border-gold bg-gold text-gold-fg" : "border-border text-muted"),
					children: "Series"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "row-fade mt-4",
				"aria-label": "Géneros",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row-scroll gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalog",
						search: {
							type,
							sort,
							year: search.year
						},
						className: cn("inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm", !search.genre ? "border-gold text-gold" : "border-border text-muted"),
						children: "Todos"
					}), genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalog",
						search: {
							type,
							genre: String(g.id),
							sort,
							year: search.year
						},
						className: cn("inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm", search.genre === String(g.id) ? "border-gold text-gold" : "border-border text-muted"),
						children: g.name
					}, g.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full sm:max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-xs text-muted",
						children: "Ordenar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sort,
						onValueChange: (v) => {
							navigate({ search: {
								...search,
								sort: v
							} });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: sorts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s.id,
							children: s.label
						}, s.id)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full sm:max-w-[8rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-xs text-muted",
						htmlFor: "year",
						children: "Año"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "year",
						inputMode: "numeric",
						placeholder: "2024",
						defaultValue: search.year ?? "",
						onBlur: (e) => {
							const year = e.target.value.trim();
							navigate({ search: {
								...search,
								year: year || void 0
							} });
						},
						onKeyDown: (e) => {
							if (e.key === "Enter") e.target.blur();
						}
					})]
				})]
			}),
			discover.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-red",
				children: "Error de conexión. Inténtalo de nuevo."
			}) : null,
			!discover.isLoading && !discover.isError && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "No hay títulos con esos filtros. Prueba otro año o género."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
				children: discover.isLoading ? Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterSkeleton, { className: "w-full" }, i)) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
					item,
					forceType: type,
					className: "w-full"
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: sentinel,
				className: "h-16"
			}),
			discover.isFetchingNextPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-8 text-center text-sm text-muted",
				children: "Cargando más…"
			}) : null
		]
	});
}
//#endregion
export { CatalogPage as component };
