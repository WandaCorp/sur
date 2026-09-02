import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { m as ChevronRight } from "../_libs/lucide-react.mjs";
import { O as RowSkeleton } from "./router-CDLma6dh.mjs";
import { t as PosterCard } from "./poster-card-Cu5MWpcC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-row-CGRGsflw.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Fila horizontal de pósters con scroll táctil y título de sección.
*/
function MediaRow({ title, items, href, forceType, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl tracking-wide text-fg md:text-3xl",
				children: title
			}), href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: href.to,
				search: href.search,
				className: "inline-flex items-center gap-1 text-sm text-muted hover:text-gold",
				children: ["Ver todo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
			}) : null]
		}), loading || !items ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-1 text-sm text-muted",
			children: "No hay títulos en esta sección."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "row-fade",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row-scroll",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterCard, {
					item,
					forceType
				}, `${item.media_type ?? forceType}-${item.id}`))
			})
		})]
	});
}
//#endregion
export { MediaRow as t };
