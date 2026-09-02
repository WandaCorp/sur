import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as ChevronLeft, l as Play, m as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as backdropSizeFor, C as getHomeFeed, E as useSettings, I as formatYear, L as mediaDate, R as mediaTitle, U as tmdbImg, b as Button, j as cn, s as Route$7, x as HOME_SECTIONS, z as mediaTypeOf } from "./router-CDLma6dh.mjs";
import { t as RatingBadge } from "./rating-badge-C-_5u0v7.mjs";
import { t as MediaRow } from "./media-row-CGRGsflw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BifFD8yN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function sortMedia(items, sort) {
	const copy = [...items];
	copy.sort((a, b) => {
		if (sort === "rating") return (b.vote_average || 0) - (a.vote_average || 0);
		if (sort === "date") return (mediaDate(b) || "").localeCompare(mediaDate(a) || "");
		return (b.popularity || 0) - (a.popularity || 0);
	});
	return copy;
}
/**
* Slider hero automático y manual, con swipe táctil y teclado.
* Pausa el autoplay al hover, al cambiar de pestaña o si hay reduced-motion.
*/
var INTERVAL = 6500;
function HeroCarousel({ items }) {
	const quality = useSettings((s) => s.imageQuality);
	const slides = items.filter((i) => i.backdrop_path).slice(0, 8);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [hoverPause, setHoverPause] = (0, import_react.useState)(false);
	const [hiddenPause, setHiddenPause] = (0, import_react.useState)(false);
	const reduceRef = (0, import_react.useRef)(false);
	const startX = (0, import_react.useRef)(0);
	const deltaX = (0, import_react.useRef)(0);
	const len = slides.length;
	const go = (0, import_react.useCallback)((dir) => {
		if (!len) return;
		setIndex((i) => (i + dir + len) % len);
	}, [len]);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		reduceRef.current = mq.matches;
		const onMq = () => {
			reduceRef.current = mq.matches;
		};
		mq.addEventListener("change", onMq);
		const onVis = () => setHiddenPause(document.hidden);
		document.addEventListener("visibilitychange", onVis);
		return () => {
			mq.removeEventListener("change", onMq);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (hoverPause || hiddenPause || len < 2 || reduceRef.current) return;
		const id = window.setInterval(() => go(1), INTERVAL);
		return () => window.clearInterval(id);
	}, [
		hoverPause,
		hiddenPause,
		len,
		go,
		index
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const t = e.target;
			if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
			if (e.key === "ArrowLeft") go(-1);
			if (e.key === "ArrowRight") go(1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [go]);
	if (!slides.length) return null;
	const current = slides[index];
	const kind = mediaTypeOf(current);
	const to = kind === "tv" ? "/tv/$id" : "/movie/$id";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative h-[min(88vh,42rem)] w-full overflow-hidden bg-bg",
		"aria-roledescription": "carrusel",
		"aria-label": "Destacados",
		onMouseEnter: () => setHoverPause(true),
		onMouseLeave: () => setHoverPause(false),
		onTouchStart: (e) => {
			startX.current = e.touches[0]?.clientX ?? 0;
			deltaX.current = 0;
			setHoverPause(true);
		},
		onTouchMove: (e) => {
			deltaX.current = (e.touches[0]?.clientX ?? 0) - startX.current;
		},
		onTouchEnd: () => {
			if (deltaX.current > 50) go(-1);
			else if (deltaX.current < -50) go(1);
			setHoverPause(false);
		},
		children: [
			slides.map((slide, i) => {
				const src = tmdbImg(slide.backdrop_path, backdropSizeFor(quality));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("hero-slide", i === index && "is-active"),
					"aria-hidden": i !== index,
					children: [src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						className: "size-full object-cover",
						fetchPriority: i === 0 ? "high" : "low"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-overlay absolute inset-0" })]
				}, slide.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-10 flex flex-col justify-end px-4 pb-16 sm:px-8 md:px-12 lg:pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold tracking-[0.2em] text-gold uppercase",
						children: "Destacado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "max-w-3xl font-display text-5xl leading-none tracking-wide sm:text-6xl md:text-7xl",
						children: mediaTitle(current)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-3 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, {
								value: current.vote_average,
								size: "lg"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatYear(mediaDate(current)) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase",
								children: kind === "tv" ? "Serie" : "Película"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl line-clamp-3 text-sm leading-relaxed text-fg/85 sm:text-base",
						children: current.overview || "Sin sinopsis disponible."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to,
								params: { id: String(current.id) },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }), " Ver ficha"]
							})
						})
					})
				]
			}),
			len > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute top-1/2 left-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-fg hover:bg-black/70 md:flex",
					onClick: () => go(-1),
					"aria-label": "Anterior",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute top-1/2 right-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-fg hover:bg-black/70 md:flex",
					onClick: () => go(1),
					"aria-label": "Siguiente",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2",
					children: slides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Ir a la diapositiva ${i + 1}`,
						"aria-current": i === index,
						className: cn("h-1.5 rounded-full transition-[width,background-color] duration-300", i === index ? "w-8 bg-gold" : "w-2.5 bg-fg/40 hover:bg-fg/70"),
						onClick: () => setIndex(i)
					}, s.id))
				})
			] }) : null
		]
	});
}
/**
* Navegación interna por géneros: chips que llevan al catálogo filtrado.
* Conmuta entre géneros de películas y de series.
*/
function GenreNav({ movieGenres, tvGenres }) {
	const [kind, setKind] = (0, import_react.useState)("movie");
	const genres = kind === "tv" ? tvGenres : movieGenres;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide md:text-3xl",
				children: "Categorías"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rounded-full border border-border p-0.5",
				role: "group",
				"aria-label": "Tipo de categoría",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind("movie"),
					className: cn("h-9 rounded-full px-4 text-sm", kind === "movie" ? "bg-gold text-gold-fg" : "text-muted hover:text-fg"),
					"aria-pressed": kind === "movie",
					children: "Películas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind("tv"),
					className: cn("h-9 rounded-full px-4 text-sm", kind === "tv" ? "bg-gold text-gold-fg" : "text-muted hover:text-fg"),
					"aria-pressed": kind === "tv",
					children: "Series"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Categorías",
			className: "row-fade",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row-scroll gap-2",
				children: genres.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog",
					search: {
						type: kind,
						genre: String(g.id)
					},
					className: "inline-flex h-10 shrink-0 items-center rounded-full border border-border px-4 text-sm text-muted transition-colors hover:border-gold hover:text-gold",
					children: g.name
				}, `${kind}-${g.id}`))
			})
		})]
	});
}
/**
* Feed principal: hero carousel, géneros y filas horizontales por categoría.
* El loader trae el feed sin adulto; si el usuario lo activa se refetch.
*/
function Home() {
	const initial = Route$7.useLoaderData();
	const hidden = useSettings((s) => s.hiddenSections);
	const sort = useSettings((s) => s.sort);
	const includeAdult = useSettings((s) => s.includeAdult);
	const { data } = useQuery({
		queryKey: ["home-feed", includeAdult],
		queryFn: () => getHomeFeed({ data: { includeAdult } }),
		initialData: includeAdult ? void 0 : initial,
		placeholderData: initial
	});
	const feed = data ?? initial;
	const visible = (items) => includeAdult ? items : items.filter((i) => !i.adult);
	const rows = [
		{
			id: "popularMovies",
			title: "Películas populares",
			items: visible(feed.popularMovies),
			type: "movie"
		},
		{
			id: "topMovies",
			title: "Mejor valoradas",
			items: visible(feed.topMovies),
			type: "movie"
		},
		{
			id: "nowPlaying",
			title: "En cines",
			items: visible(feed.nowPlaying),
			type: "movie"
		},
		{
			id: "upcoming",
			title: "Próximos estrenos",
			items: visible(feed.upcoming),
			type: "movie"
		},
		{
			id: "popularTv",
			title: "Series populares",
			items: visible(feed.popularTv),
			type: "tv"
		},
		{
			id: "topTv",
			title: "Series mejor valoradas",
			items: visible(feed.topTv),
			type: "tv"
		},
		{
			id: "onAir",
			title: "En emisión",
			items: visible(feed.onAir),
			type: "tv"
		},
		{
			id: "action",
			title: "Acción",
			items: visible(feed.action),
			type: "movie",
			genre: "28"
		},
		{
			id: "comedy",
			title: "Comedia",
			items: visible(feed.comedy),
			type: "movie",
			genre: "35"
		},
		{
			id: "drama",
			title: "Drama",
			items: visible(feed.drama),
			type: "movie",
			genre: "18"
		},
		{
			id: "thriller",
			title: "Thriller",
			items: visible(feed.thriller ?? []),
			type: "movie",
			genre: "53"
		},
		{
			id: "scifi",
			title: "Ciencia ficción",
			items: visible(feed.scifi ?? []),
			type: "movie",
			genre: "878"
		},
		{
			id: "horror",
			title: "Terror",
			items: visible(feed.horror ?? []),
			type: "movie",
			genre: "27"
		},
		{
			id: "animation",
			title: "Animación",
			items: visible(feed.animation ?? []),
			type: "movie",
			genre: "16"
		},
		{
			id: "romance",
			title: "Romance",
			items: visible(feed.romance ?? []),
			type: "movie",
			genre: "10749"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [hidden.includes("trending") ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCarousel, { items: visible(feed.trending) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[90rem] space-y-10 px-4 py-8 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreNav, {
			movieGenres: feed.movieGenres,
			tvGenres: feed.tvGenres
		}), rows.filter((r) => !hidden.includes(r.id)).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaRow, {
			title: HOME_SECTIONS.find((s) => s.id === r.id)?.label ?? r.title,
			items: sortMedia(r.items, sort),
			forceType: r.type,
			href: {
				to: "/catalog",
				search: {
					type: r.type,
					genre: r.genre,
					sort: "popularity.desc"
				}
			}
		}, r.id))]
	})] });
}
//#endregion
export { Home as component };
