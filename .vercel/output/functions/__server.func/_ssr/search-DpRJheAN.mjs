import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery, t as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { D as PosterSkeleton, E as useSettings, T as tmdbGet, a as Route$4, j as cn, u as AdultToggle, y as Input, z as mediaTypeOf } from "./router-CDLma6dh.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, o as useInfiniteScroll, r as SelectItem, t as Select } from "./select-DP3us_Em.mjs";
import { t as PosterCard } from "./poster-card-Cu5MWpcC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-DpRJheAN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Búsqueda global con filtros: tipo, año, género y orden.
*/
function SearchPage() {
	const search = Route$4.useSearch();
	const navigate = useNavigate({ from: "/search" });
	const includeAdult = useSettings((s) => s.includeAdult);
	const q = search.q?.trim() ?? "";
	const type = search.type ?? "all";
	const genresQuery = useQuery({
		queryKey: ["genres", "movie"],
		queryFn: () => tmdbGet({ data: { path: "/genre/movie/list" } })
	});
	const path = type === "tv" ? "/search/tv" : type === "person" ? "/search/person" : type === "movie" ? "/search/movie" : "/search/multi";
	const results = useInfiniteQuery({
		queryKey: [
			"search-page",
			path,
			q,
			includeAdult,
			search.year
		],
		enabled: q.length >= 2,
		initialPageParam: 1,
		queryFn: async ({ pageParam }) => {
			const query = {
				query: q,
				page: pageParam,
				include_adult: includeAdult
			};
			if (search.year && type === "movie") query.year = search.year;
			if (search.year && type === "tv") query.first_air_date_year = search.year;
			return tmdbGet({ data: {
				path,
				query,
				includeAdult
			} });
		},
		getNextPageParam: (last) => last.page < last.total_pages && last.page < 500 ? last.page + 1 : void 0
	});
	const raw = (0, import_react.useMemo)(() => results.data?.pages.flatMap((p) => p.results) ?? [], [results.data]);
	const items = (0, import_react.useMemo)(() => {
		let list = raw;
		if (search.genre) {
			const gid = Number(search.genre);
			list = list.filter((i) => i.genre_ids?.includes(gid));
		}
		if (search.sort === "vote_average.desc") list = [...list].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
		else if (search.sort === "original_title.asc") list = [...list].sort((a, b) => (a.title || a.name || "").localeCompare(b.title || b.name || "", "es"));
		else list = [...list].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
		return list;
	}, [
		raw,
		search.genre,
		search.sort
	]);
	const sentinel = useInfiniteScroll(() => {
		if (results.hasNextPage && !results.isFetchingNextPage) results.fetchNextPage();
	}, Boolean(results.hasNextPage));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[90rem] px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide",
				children: "Buscar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "mt-6 max-w-xl",
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					const next = String(fd.get("q") || "").trim();
					navigate({ search: {
						...search,
						q: next
					} });
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "q",
					defaultValue: q,
					placeholder: "Título, serie o persona",
					"aria-label": "Consulta"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					{
						id: "all",
						label: "Todo"
					},
					{
						id: "movie",
						label: "Películas"
					},
					{
						id: "tv",
						label: "Series"
					},
					{
						id: "person",
						label: "Personas"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void navigate({ search: {
						...search,
						type: t.id
					} }),
					className: cn("h-10 rounded-full border px-4 text-sm", type === t.id ? "border-gold bg-gold text-gold-fg" : "border-border text-muted"),
					children: t.label
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-4 sm:flex-row sm:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs text-muted",
							children: "Ordenar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: search.sort ?? "popularity.desc",
							onValueChange: (v) => void navigate({ search: {
								...search,
								sort: v
							} }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "popularity.desc",
									children: "Popularidad"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "vote_average.desc",
									children: "Rating"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "original_title.asc",
									children: "Título"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:max-w-[8rem]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs text-muted",
							htmlFor: "s-year",
							children: "Año"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "s-year",
							defaultValue: search.year ?? "",
							placeholder: "2024",
							onBlur: (e) => void navigate({ search: {
								...search,
								year: e.target.value.trim() || void 0
							} })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs text-muted",
							children: "Género"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: search.genre ?? "all",
							onValueChange: (v) => void navigate({ search: {
								...search,
								genre: v === "all" ? void 0 : v
							} }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Todos" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Todos"
							}), (genresQuery.data?.genres ?? []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(g.id),
								children: g.name
							}, g.id))] })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 max-w-xl rounded-xl border border-border bg-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultToggle, {})
			}),
			!q || q.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "Escribe al menos 2 caracteres para buscar."
			}) : results.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-red",
				children: "Error de conexión con TMDb."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 text-sm text-muted",
					children: [results.data?.pages[0]?.total_results ?? 0, " resultados"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
					children: results.isLoading ? Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterSkeleton, { className: "w-full" }, i)) : items.map((item) => {
						const kind = mediaTypeOf(item);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
							item,
							forceType: kind === "person" ? "person" : kind,
							className: "w-full"
						}, `${kind}-${item.id}`);
					})
				}),
				!results.isLoading && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						"Sin coincidencias para “",
						q,
						"”."
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: sentinel,
					className: "h-16"
				})
			] })
		]
	});
}
//#endregion
export { SearchPage as component };
