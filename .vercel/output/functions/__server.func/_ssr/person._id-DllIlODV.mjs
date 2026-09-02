import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as ExternalLink, n as User } from "../_libs/lucide-react.mjs";
import { M as formatCompact, N as formatDate, U as tmdbImg, b as Button, r as Route$2, z as mediaTypeOf } from "./router-CDLma6dh.mjs";
import { t as PosterCard } from "./poster-card-Cu5MWpcC.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as ImageGallery } from "./gallery-CMogau7N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/person._id-DllIlODV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Ficha de actor/actriz: biografía, filmografía clickeable e imágenes.
*/
var DEPT = {
	Acting: "Interpretación",
	Directing: "Dirección",
	Writing: "Guion",
	Production: "Producción",
	Camera: "Cámara",
	Editing: "Montaje",
	Sound: "Sonido",
	Art: "Arte",
	Crew: "Equipo"
};
var GENDER = {
	1: "Mujer",
	2: "Hombre",
	3: "No binario"
};
function PersonPage() {
	const person = Route$2.useLoaderData();
	const photo = tmdbImg(person.profile_path, "h632");
	const crew = person.combined_credits?.crew ?? [];
	const acting = person.combined_credits?.cast ?? [];
	const directing = crew.filter((c) => c.job === "Director" || c.department === "Directing");
	const writing = crew.filter((c) => c.department === "Writing");
	const lead = person.known_for_department === "Directing" ? [
		...directing,
		...writing,
		...crew,
		...acting
	] : person.known_for_department === "Writing" ? [
		...writing,
		...crew,
		...acting
	] : [...acting, ...crew];
	const seen = /* @__PURE__ */ new Set();
	const filmography = lead.filter((c) => {
		if (!c.poster_path) return false;
		const k = `${c.media_type ?? mediaTypeOf(c)}-${c.id}`;
		if (seen.has(k)) return false;
		seen.add(k);
		return true;
	}).sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0) || (b.popularity || 0) - (a.popularity || 0));
	const movies = filmography.filter((c) => mediaTypeOf(c) === "movie");
	const shows = filmography.filter((c) => mediaTypeOf(c) === "tv");
	const profiles = person.images?.profiles ?? [];
	const imdb = person.imdb_id || person.external_ids?.imdb_id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-[90rem] px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-8 md:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full max-w-56 shrink-0 overflow-hidden rounded-xl bg-elevated",
					children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo,
						alt: person.name,
						className: "aspect-[2/3] w-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex aspect-[2/3] items-center justify-center text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-16" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-[0.2em] text-gold uppercase",
							children: "Persona"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-5xl tracking-wide",
							children: person.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: DEPT[person.known_for_department] ?? person.known_for_department
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Nacimiento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: formatDate(person.birthday)
								})] }),
								person.deathday ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Fallecimiento"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: formatDate(person.deathday)
								})] }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Lugar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: person.place_of_birth || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Popularidad"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 tabular-nums",
									children: formatCompact(person.popularity)
								})] }),
								GENDER[person.gender] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted",
									children: "Género"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: GENDER[person.gender]
								})] }) : null
							]
						}),
						person.also_known_as?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-muted",
							children: ["También conocido como: ", person.also_known_as.slice(0, 6).join(" · ")]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-3",
							children: [imdb ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://www.imdb.com/name/${imdb}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-10 items-center gap-1 text-sm text-cyan hover:underline",
								children: ["IMDb ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
							}) : null, person.homepage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: person.homepage,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-10 items-center gap-1 text-sm text-cyan hover:underline",
								children: ["Web ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
							}) : null]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-3xl tracking-wide",
					children: "Biografía"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-3xl whitespace-pre-line text-sm leading-relaxed text-fg/90",
					children: person.biography || "Sin biografía disponible en español."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "all",
				className: "mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "all",
							children: "Filmografía"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "movies",
							children: "Películas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "tv",
							children: "Series"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "photos",
							children: "Imágenes"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "all",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { items: filmography })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "movies",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
							items: movies,
							force: "movie"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "tv",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
							items: shows,
							force: "tv"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "photos",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageGallery, {
							backdrops: [],
							posters: profiles
						})
					})
				]
			})
		]
	});
}
function Grid({ items, force }) {
	const [limit, setLimit] = (0, import_react.useState)(24);
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Sin títulos."
	});
	const shown = items.slice(0, limit);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
		children: shown.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
			item,
			forceType: force ?? (item.media_type === "tv" ? "tv" : "movie"),
			className: "w-full"
		}, `${item.media_type}-${item.id}-${item.character ?? item.job ?? ""}`))
	}), limit < items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		className: "mt-6",
		onClick: () => setLimit((n) => n + 24),
		children: [
			"Ver más (",
			items.length - limit,
			" restantes)"
		]
	}) : null] });
}
//#endregion
export { PersonPage as component };
