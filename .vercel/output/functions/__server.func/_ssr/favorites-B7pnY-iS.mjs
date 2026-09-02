import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Trash2, d as Heart } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { U as tmdbImg, _ as AlertDialogHeader, b as Button, c as useHydrated, d as AlertDialog, f as AlertDialogAction, g as AlertDialogFooter, h as AlertDialogDescription, j as cn, k as Skeleton, l as useFavorites, m as AlertDialogContent, p as AlertDialogCancel, v as AlertDialogTitle } from "./router-CDLma6dh.mjs";
import { t as RatingBadge } from "./rating-badge-C-_5u0v7.mjs";
import { n as useTags, t as TAG_META } from "./tags-DPJTRJPP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-B7pnY-iS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Página de favoritos: listar, filtrar, quitar y persistir en localStorage.
*/
function FavoritesPage() {
	const hydrated = useHydrated();
	const items = useFavorites((s) => s.items);
	const remove = useFavorites((s) => s.remove);
	const clear = useFavorites((s) => s.clear);
	const tags = useTags((s) => s.tags);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const visible = filter === "all" ? items : items.filter((i) => i.mediaType === filter);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-[90rem] px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[90rem] px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.2em] text-gold uppercase",
						children: "Tu lista"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-wide",
						children: "Favoritos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [items.length, " títulos en este dispositivo"]
					})
				] }), items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setConfirm(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Vaciar"]
				}) : null]
			}),
			items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				role: "group",
				"aria-label": "Filtrar favoritos",
				children: [
					["all", "Todos"],
					["movie", "Películas"],
					["tv", "Series"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(id),
					className: cn("h-10 rounded-full border px-4 text-sm", filter === id ? "border-gold bg-gold text-gold-fg" : "border-border text-muted"),
					children: label
				}, id))
			}) : null,
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-10 text-subtle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Aún no has guardado nada. Explora el catálogo y toca Favorito."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/catalog",
							search: { type: "movie" },
							children: "Ir al catálogo"
						})
					})
				]
			}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "No hay títulos de este tipo en tu lista."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: visible.map((item) => {
					const to = item.mediaType === "tv" ? "/tv/$id" : "/movie/$id";
					const poster = tmdbImg(item.posterPath, "w185");
					const tag = tags[`${item.mediaType}:${item.id}`];
					const meta = tag ? TAG_META[tag] : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 rounded-xl border border-border bg-surface p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to,
								params: { id: String(item.id) },
								className: "h-24 w-16 shrink-0 overflow-hidden rounded-md bg-elevated",
								children: poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: poster,
									alt: "",
									className: "size-full object-cover"
								}) : null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to,
										params: { id: String(item.id) },
										className: "font-medium hover:text-gold",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [item.mediaType === "tv" ? "Serie" : "Película", item.year ? ` · ${item.year}` : ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, { value: item.voteAverage }), meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													children: meta.emoji
												}),
												" ",
												meta.label
											]
										}) : null]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": `Quitar ${item.title}`,
								onClick: () => {
									remove(item.id, item.mediaType);
									toast.success("Eliminado de favoritos");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					}, `${item.mediaType}-${item.id}`);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirm,
				onOpenChange: setConfirm,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "¿Vaciar favoritos?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"Se eliminarán ",
					items.length,
					" títulos de este dispositivo. Esta acción no se puede deshacer."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						clear();
						toast.success("Lista vaciada");
					},
					children: "Vaciar lista"
				})] })] })
			})
		]
	});
}
//#endregion
export { FavoritesPage as component };
