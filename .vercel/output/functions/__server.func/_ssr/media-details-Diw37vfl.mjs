import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { d as Heart, f as ExternalLink, g as ChevronDown, l as Play, n as User, p as Clapperboard } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as backdropSizeFor, E as useSettings, F as formatRuntime, M as formatCompact, N as formatDate, P as formatMoney, R as mediaTitle, S as getCollection, U as tmdbImg, b as Button, c as useHydrated, j as cn, k as Skeleton, l as useFavorites, w as getSeason } from "./router-CDLma6dh.mjs";
import { t as RatingBadge } from "./rating-badge-C-_5u0v7.mjs";
import { n as useTags, t as TAG_META } from "./tags-DPJTRJPP.mjs";
import { t as MediaRow } from "./media-row-CGRGsflw.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as ImageGallery } from "./gallery-CMogau7N.mjs";
import { a as CartesianGrid, c as PolarAngleAxis, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as RadialBar, t as RadialBarChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-details-Diw37vfl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REGION_ORDER = [
	"ES",
	"MX",
	"AR",
	"CL",
	"CO",
	"US",
	"GB"
];
function isMovieDetails(d) {
	return "runtime" in d && !("number_of_seasons" in d);
}
/** Palabras clave unificadas (movie.keywords vs tv.results). */
function keywordsOf(data) {
	const pack = data.keywords;
	if (!pack) return [];
	return pack.keywords ?? pack.results ?? [];
}
/** Primera certificación no vacía según preferencia de región hispana. */
function certificationOf(data) {
	if (isMovieDetails(data)) {
		const blocks = data.release_dates?.results ?? [];
		for (const cc of REGION_ORDER) {
			const cert = blocks.find((b) => b.iso_3166_1 === cc)?.release_dates?.find((r) => r.certification?.trim())?.certification;
			if (cert) return cert.trim();
		}
		for (const loc of blocks) {
			const cert = loc.release_dates?.find((r) => r.certification?.trim())?.certification;
			if (cert) return cert.trim();
		}
		return null;
	}
	const blocks = data.content_ratings?.results ?? [];
	for (const cc of REGION_ORDER) {
		const loc = blocks.find((b) => b.iso_3166_1 === cc);
		if (loc?.rating?.trim()) return loc.rating.trim();
	}
	return blocks.find((b) => b.rating?.trim())?.rating?.trim() ?? null;
}
/** Plataformas de visionado: prioriza España y Latinoamérica. */
function watchLocaleOf(data) {
	const results = data["watch/providers"]?.results;
	if (!results) return null;
	for (const cc of REGION_ORDER) {
		const loc = results[cc];
		if (loc && (loc.flatrate?.length || loc.rent?.length || loc.buy?.length || loc.ads?.length || loc.free?.length)) return {
			region: cc,
			locale: loc
		};
	}
	const first = Object.entries(results).find(([, loc]) => loc && (loc.flatrate?.length || loc.rent?.length || loc.buy?.length));
	return first ? {
		region: first[0],
		locale: first[1]
	} : null;
}
/** Primer trailer / teaser de YouTube, si existe. */
function youtubeTrailer(videos) {
	const yt = (videos ?? []).filter((v) => v.site === "YouTube");
	return yt.find((v) => v.type === "Trailer" && v.official) || yt.find((v) => v.type === "Trailer") || yt.find((v) => v.type === "Teaser") || yt[0];
}
function imdbIdOf(data) {
	if (isMovieDetails(data) && data.imdb_id) return data.imdb_id;
	return data.external_ids?.imdb_id ?? null;
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "border-transparent bg-elevated text-fg",
		gold: "border-transparent bg-gold text-gold-fg",
		outline: "border-border text-muted",
		red: "border-transparent bg-red text-fg",
		cyan: "border-transparent bg-cyan/20 text-cyan"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
/**
* Alterna un título en favoritos (localStorage) y muestra un toast.
*/
function FavoriteButton({ item }) {
	const hydrated = useHydrated();
	const has = useFavorites((s) => s.has(item.id, item.mediaType));
	const toggle = useFavorites((s) => s.toggle);
	const active = hydrated && has;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: active ? "default" : "outline",
		onClick: () => {
			const added = toggle(item);
			toast.success(added ? "Agregado a favoritos" : "Eliminado de favoritos");
		},
		"aria-pressed": active,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", active && "fill-current") }), active ? "En favoritos" : "Favorito"]
	});
}
/**
* Etiquetado local: Buena / Regular / Mala (emoji + texto, persistido).
*/
var ORDER = [
	"buena",
	"regular",
	"mala"
];
function TagPicker({ id, mediaType }) {
	const hydrated = useHydrated();
	const current = useTags((s) => s.tags[`${mediaType}:${id}`]);
	const setTag = useTags((s) => s.setTag);
	const active = hydrated ? current : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		role: "group",
		"aria-label": "Tu valoración",
		children: ORDER.map((tag) => {
			const meta = TAG_META[tag];
			const on = active === tag;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				title: meta.hint,
				"aria-pressed": on,
				onClick: () => {
					setTag(id, mediaType, on ? null : tag);
					toast.success(on ? "Etiqueta quitada" : `Marcada como ${meta.label.toLowerCase()}`);
				},
				className: cn("inline-flex h-11 items-center gap-2 rounded-full border px-3 text-sm transition-colors", on ? "border-gold bg-gold/15 text-gold" : "border-border text-muted hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: meta.emoji
				}), meta.label]
			}, tag);
		})
	});
}
/**
* Ficha técnica: reparto y equipo (dirección, guion) con enlace a la persona.
*/
function PersonChip({ person, caption }) {
	const src = tmdbImg(person.profile_path, "w185");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/person/$id",
		params: { id: String(person.id) },
		className: "w-28 shrink-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-[2/3] overflow-hidden rounded-md bg-elevated",
				children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					loading: "lazy",
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-full items-center justify-center text-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-8" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 line-clamp-2 text-sm font-medium",
				children: person.name
			}),
			caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-xs text-muted",
				children: caption
			}) : null
		]
	});
}
function CastCrew({ cast, crew }) {
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	const directors = crew.filter((c) => c.job === "Director");
	const writers = crew.filter((c) => c.department === "Writing" || c.job === "Writer" || c.job === "Screenplay");
	const visible = showAll ? cast : cast.slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [directors.length || writers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [directors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 text-sm font-semibold text-muted",
				children: "Dirección"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: directors.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/person/$id",
					params: { id: String(d.id) },
					className: "hover:text-gold",
					children: d.name
				}) }, `d-${d.id}-${d.job}`))
			})] }) : null, writers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 text-sm font-semibold text-muted",
				children: "Guion"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: writers.slice(0, 8).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/person/$id",
					params: { id: String(d.id) },
					className: "hover:text-gold",
					children: d.name
				}), d.job ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [" · ", d.job]
				}) : null] }, `w-${d.id}-${d.job}`))
			})] }) : null]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 font-display text-2xl tracking-wide",
			children: "Reparto"
		}), cast.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Sin datos de reparto."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "row-scroll",
			children: visible.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonChip, {
				person: p,
				caption: p.character
			}, `${p.id}-${p.character}`))
		}), cast.length > 12 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			className: "mt-3",
			onClick: () => setShowAll((v) => !v),
			children: showAll ? "Ver menos" : `Ver todo el reparto (${cast.length})`
		}) : null] })] })]
	});
}
/**
* Lista de videos TMDb con reproducción embebida de YouTube.
*/
function Trailers({ videos }) {
	const yt = videos.filter((v) => v.site === "YouTube");
	const ordered = [
		...yt.filter((v) => v.type === "Trailer"),
		...yt.filter((v) => v.type === "Teaser"),
		...yt.filter((v) => v.type !== "Trailer" && v.type !== "Teaser")
	];
	const [current, setCurrent] = (0, import_react.useState)(ordered[0]?.key ?? null);
	if (!ordered.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No hay trailers disponibles."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1fr_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-video overflow-hidden rounded-lg bg-black",
			children: current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Trailer",
				src: `https://www.youtube-nocookie.com/embed/${current}?rel=0`,
				className: "size-full",
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
				allowFullScreen: true
			}) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex max-h-[22rem] flex-col gap-2 overflow-y-auto lg:max-h-none",
			children: ordered.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCurrent(v.key),
				className: "flex w-full items-center gap-3 rounded-md bg-elevated p-2 text-left hover:bg-border",
				"aria-current": current === v.key,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative size-16 shrink-0 overflow-hidden rounded-sm bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `https://img.youtube.com/vi/${v.key}/mqdefault.jpg`,
						alt: "",
						className: "size-full object-cover",
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "absolute inset-0 m-auto size-5 fill-fg text-fg" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "line-clamp-2 text-sm font-medium",
						children: v.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: v.type
					})]
				})]
			}) }, v.id))
		})]
	});
}
/**
* Estadísticas interactivas (Recharts) a partir de datos TMDb:
* rating radial, votos vs popularidad y presupuesto vs recaudación.
*/
function StatsPanel(props) {
	const rating = Math.round((props.voteAverage || 0) * 10) / 10;
	const radial = [{
		name: "Rating",
		value: Math.min(rating * 10, 100),
		fill: "#ffd700"
	}];
	const reception = [{
		name: "Votos",
		value: props.voteCount || 0
	}, {
		name: "Popularidad",
		value: Math.round(props.popularity || 0)
	}];
	const money = props.budget || props.revenue ? [{
		name: "Presupuesto",
		value: props.budget || 0
	}, {
		name: "Ingresos",
		value: props.revenue || 0
	}] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-muted",
						children: "Puntuación TMDb"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto h-44 w-44",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
							innerRadius: "72%",
							outerRadius: "100%",
							data: radial,
							startAngle: 90,
							endAngle: -270,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
								type: "number",
								domain: [0, 100],
								tick: false
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
								dataKey: "value",
								cornerRadius: 8,
								background: { fill: "#1a1a1a" }
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-4xl text-gold tabular-nums",
								children: rating.toFixed(1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: "/ 10"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs text-muted",
						children: [
							formatCompact(props.voteCount),
							" votos · pop. ",
							formatCompact(props.popularity)
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-sm font-semibold text-muted",
					children: "Recepción"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-44",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: reception,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "#2a2a2a",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								stroke: "#a3a3a3",
								fontSize: 12,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "#a3a3a3",
								fontSize: 11,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "#121212",
									border: "1px solid #2a2a2a",
									borderRadius: 8
								},
								formatter: (v) => formatCompact(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "value",
								fill: "#00a8e1",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					}) })
				})]
			}),
			money ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-sm font-semibold text-muted",
						children: "Finanzas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: money,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "#2a2a2a",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									stroke: "#a3a3a3",
									fontSize: 12,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										background: "#121212",
										border: "1px solid #2a2a2a",
										borderRadius: 8
									},
									formatter: (v) => formatMoney(v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "value",
									fill: "#ffd700",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						}) })
					}),
					props.budget && props.revenue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-center text-xs text-muted",
						children: [
							"Retorno ",
							(props.revenue / props.budget * 100).toFixed(0),
							"%"
						]
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold text-muted",
					children: "Ficha rápida"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "space-y-2 text-sm",
					children: [
						props.runtime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Duración"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "tabular-nums",
								children: [props.runtime, " min"]
							})]
						}) : null,
						props.seasons != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Temporadas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: props.seasons
							})]
						}) : null,
						props.episodes != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Episodios"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: props.episodes
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Popularidad"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: formatCompact(props.popularity)
							})]
						})
					]
				})]
			})
		]
	});
}
/**
* Temporadas de una serie: acordeón que carga episodios bajo demanda.
*/
function SeasonBlock({ tvId, season, open, onToggle }) {
	const { data, isLoading, isError } = useQuery({
		queryKey: [
			"season",
			tvId,
			season.season_number
		],
		queryFn: () => getSeason({ data: {
			tvId,
			season: season.season_number
		} }),
		enabled: open
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			"aria-expanded": open,
			className: "flex w-full items-center gap-4 p-4 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-20 w-14 shrink-0 overflow-hidden rounded-md bg-elevated",
					children: season.poster_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: tmdbImg(season.poster_path, "w185") ?? "",
						alt: "",
						className: "size-full object-cover"
					}) : null
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: season.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								season.episode_count,
								" episodios",
								season.air_date ? ` · ${formatDate(season.air_date)}` : ""
							]
						}),
						season.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted",
							children: season.overview
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-5 shrink-0 text-muted transition-transform", open && "rotate-180") })
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border p-4",
			children: [
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16" })]
				}) : null,
				isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-red",
					children: "No se pudieron cargar los episodios."
				}) : null,
				data?.episodes?.map((ep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 border-b border-border py-3 last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-16 w-28 shrink-0 overflow-hidden rounded-md bg-elevated",
						children: ep.still_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: tmdbImg(ep.still_path, "w300") ?? "",
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						}) : null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: [
										ep.episode_number,
										". ",
										ep.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, { value: ep.vote_average })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									formatDate(ep.air_date),
									" · ",
									formatRuntime(ep.runtime)
								]
							}),
							ep.overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-3 text-sm text-muted",
								children: ep.overview
							}) : null
						]
					})]
				}, ep.id))
			]
		}) : null]
	});
}
function SeasonList({ tvId, seasons }) {
	const list = seasons.filter((s) => s.season_number >= 0);
	const [open, setOpen] = (0, import_react.useState)(list[0]?.season_number ?? null);
	if (!list.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Sin temporadas."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonBlock, {
			tvId,
			season: s,
			open: open === s.season_number,
			onToggle: () => setOpen((v) => v === s.season_number ? null : s.season_number)
		}, s.id))
	});
}
/**
* Dónde ver: plataformas de streaming / alquiler / compra según TMDb (JustWatch).
*/
var LABELS = [
	{
		key: "flatrate",
		label: "Suscripción"
	},
	{
		key: "free",
		label: "Gratis"
	},
	{
		key: "ads",
		label: "Con anuncios"
	},
	{
		key: "rent",
		label: "Alquiler"
	},
	{
		key: "buy",
		label: "Compra"
	}
];
function ProviderRow({ items }) {
	const unique = items.filter((p, i, arr) => arr.findIndex((x) => x.provider_id === p.provider_id) === i);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-wrap gap-2",
		children: unique.map((p) => {
			const logo = tmdbImg(p.logo_path, "w92");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 rounded-md bg-elevated px-2 py-1.5",
				children: [logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: logo,
					alt: "",
					className: "size-8 rounded-sm object-cover",
					loading: "lazy"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					children: p.provider_name
				})]
			}, p.provider_id);
		})
	});
}
function WatchProviders({ region, locale }) {
	const groups = LABELS.filter((g) => {
		const list = locale[g.key];
		return Array.isArray(list) && list.length > 0;
	});
	if (!groups.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-end justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-wide",
					children: "Dónde ver"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						"Disponibilidad (",
						region,
						") vía JustWatch"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase",
					children: g.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderRow, { items: locale[g.key] })] }, g.key))
			}),
			locale.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: locale.link,
				target: "_blank",
				rel: "noreferrer",
				className: "mt-3 inline-block text-xs text-cyan hover:underline",
				children: "Ver todas las opciones en TMDb"
			}) : null
		]
	});
}
/**
* Colección a la que pertenece una película (p. ej. MCU, Alien).
*/
function CollectionRow({ collection }) {
	const { data, isLoading } = useQuery({
		queryKey: ["collection", collection.id],
		queryFn: () => getCollection({ data: { id: collection.id } })
	});
	const parts = (data?.parts ?? []).filter((p) => p.poster_path);
	parts.sort((a, b) => (a.release_date || "").localeCompare(b.release_date || ""));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
		title: data?.name || collection.name,
		items: parts,
		forceType: "movie",
		loading: isLoading
	});
}
/**
* Vista de detalle compartida para película y serie.
* Hero, metadatos, etiquetas, stats, pestañas (reparto, galería, videos, temporadas).
*/
function MediaDetailsView({ data, type }) {
	const quality = useSettings((s) => s.imageQuality);
	const title = mediaTitle(data);
	const year = isMovieDetails(data) ? data.release_date : data.first_air_date;
	const backdrop = tmdbImg(data.backdrop_path, backdropSizeFor(quality));
	const poster = tmdbImg(data.poster_path, "w500");
	const runtime = isMovieDetails(data) ? data.runtime : data.episode_run_time?.[0];
	const companies = data.production_companies ?? [];
	const langs = data.spoken_languages ?? [];
	const countries = data.production_countries ?? [];
	const original = isMovieDetails(data) ? data.original_title : data.original_name;
	const cert = certificationOf(data);
	const keywords = keywordsOf(data).slice(0, 12);
	const watch = watchLocaleOf(data);
	const trailer = youtubeTrailer(data.videos?.results);
	const imdb = imdbIdOf(data);
	const directors = (data.credits?.crew ?? []).filter((c) => c.job === "Director");
	const creators = !isMovieDetails(data) ? data.created_by ?? [] : [];
	const networks = !isMovieDetails(data) ? data.networks ?? [] : [];
	const nextEp = !isMovieDetails(data) ? data.next_episode_to_air : null;
	const lastEp = !isMovieDetails(data) ? data.last_episode_to_air : null;
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": type === "tv" ? "TVSeries" : "Movie",
		name: title,
		description: data.overview || void 0,
		image: poster || backdrop || void 0,
		datePublished: year || void 0,
		aggregateRating: data.vote_count ? {
			"@type": "AggregateRating",
			ratingValue: data.vote_average,
			bestRating: 10,
			ratingCount: data.vote_count
		} : void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			children: JSON.stringify(jsonLd)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-[22rem] overflow-hidden md:min-h-[28rem]",
			children: [backdrop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: backdrop,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-elevated" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-overlay absolute inset-0" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto -mt-40 max-w-[90rem] px-4 pb-16 sm:px-6 md:-mt-48",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 md:flex-row md:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-elevated shadow-card sm:w-52",
						children: poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: poster,
							alt: `Póster de ${title}`,
							className: "aspect-[2/3] w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex aspect-[2/3] items-center justify-center text-subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "size-12" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold tracking-[0.2em] text-gold uppercase",
								children: [type === "tv" ? "Serie" : "Película", cert ? ` · ${cert}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl tracking-wide sm:text-5xl md:text-6xl",
								children: title
							}),
							original && original !== title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: ["Título original: ", original]
							}) : null,
							"tagline" in data && data.tagline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted italic",
								children: data.tagline
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, {
										value: data.vote_average,
										size: "lg"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: formatDate(year)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: formatRuntime(runtime)
									}),
									"status" in data && data.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: data.status
									}) : null
								]
							}),
							directors.length || creators.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: directors.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Dirección:",
									" ",
									directors.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [i > 0 ? ", " : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/person/$id",
										params: { id: String(d.id) },
										className: "text-fg hover:text-gold",
										children: d.name
									})] }, d.id))
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Creación:",
									" ",
									creators.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [i > 0 ? ", " : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/person/$id",
										params: { id: String(d.id) },
										className: "text-fg hover:text-gold",
										children: d.name
									})] }, d.id))
								] })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: (data.genres ?? []).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/catalog",
									search: {
										type,
										genre: String(g.id)
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "default",
										children: g.name
									})
								}, g.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 pt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FavoriteButton, { item: {
										id: data.id,
										mediaType: type,
										title,
										posterPath: data.poster_path,
										voteAverage: data.vote_average,
										year: year?.slice(0, 4)
									} }),
									trailer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `#trailers`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), " Ver trailer"]
										})
									}) : null,
									imdb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ghost",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `https://www.imdb.com/title/${imdb}`,
											target: "_blank",
											rel: "noreferrer",
											children: ["IMDb ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
										})
									}) : null,
									data.homepage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ghost",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: data.homepage,
											target: "_blank",
											rel: "noreferrer",
											children: ["Web ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
										})
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagPicker, {
								id: data.id,
								mediaType: type
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-3xl text-base leading-relaxed text-fg/90",
					children: data.overview || "Sin sinopsis disponible."
				}),
				watch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchProviders, {
						region: watch.region,
						locale: watch.locale
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 lg:grid-cols-4",
					children: [
						isMovieDetails(data) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Presupuesto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: formatMoney(data.budget)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Ingresos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: formatMoney(data.revenue)
						})] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Temporadas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium tabular-nums",
							children: data.number_of_seasons
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Episodios"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium tabular-nums",
							children: data.number_of_episodes
						})] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Idiomas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: langs.map((l) => l.name || l.english_name).join(", ") || "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Compañías"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: companies.slice(0, 4).map((c) => c.name).join(", ") || "—"
						})] }),
						countries.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Países"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: countries.map((c) => c.name).join(", ")
						})] }) : null,
						networks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Cadenas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-medium",
							children: networks.map((n) => n.name).join(", ")
						})] }) : null,
						lastEp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Último episodio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 font-medium",
							children: [
								"T",
								lastEp.season_number,
								" E",
								lastEp.episode_number,
								" · ",
								formatDate(lastEp.air_date)
							]
						})] }) : null,
						nextEp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Próximo episodio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "mt-1 font-medium",
							children: [
								"T",
								nextEp.season_number,
								" E",
								nextEp.episode_number,
								" · ",
								formatDate(nextEp.air_date)
							]
						})] }) : null
					]
				}),
				keywords.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 flex flex-wrap gap-2",
					children: keywords.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: k.name
					}) }, k.id))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-display text-3xl tracking-wide",
						children: "Estadísticas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsPanel, {
						voteAverage: data.vote_average,
						voteCount: data.vote_count,
						popularity: data.popularity,
						budget: isMovieDetails(data) ? data.budget : void 0,
						revenue: isMovieDetails(data) ? data.revenue : void 0,
						runtime,
						seasons: !isMovieDetails(data) ? data.number_of_seasons : void 0,
						episodes: !isMovieDetails(data) ? data.number_of_episodes : void 0
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "cast",
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "flex h-auto w-full flex-wrap justify-start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "cast",
									children: "Ficha técnica"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "videos",
									children: "Trailers"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "gallery",
									children: "Galería"
								}),
								type === "tv" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "seasons",
									children: "Temporadas"
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "cast",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CastCrew, {
								cast: data.credits?.cast ?? [],
								crew: data.credits?.crew ?? []
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "videos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: "trailers",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trailers, { videos: data.videos?.results ?? [] })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "gallery",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageGallery, {
								backdrops: data.images?.backdrops ?? [],
								posters: data.images?.posters ?? []
							})
						}),
						type === "tv" && !isMovieDetails(data) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "seasons",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonList, {
								tvId: String(data.id),
								seasons: data.seasons ?? []
							})
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 space-y-10",
					children: [
						isMovieDetails(data) && data.belongs_to_collection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionRow, { collection: data.belongs_to_collection }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
							title: "Recomendaciones",
							items: data.recommendations?.results ?? [],
							forceType: type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
							title: "Similares",
							items: data.similar?.results ?? [],
							forceType: type
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { MediaDetailsView as t };
