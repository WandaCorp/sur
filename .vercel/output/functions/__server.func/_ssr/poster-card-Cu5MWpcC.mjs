import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as User, p as Clapperboard } from "../_libs/lucide-react.mjs";
import { B as posterSizeFor, E as useSettings, I as formatYear, L as mediaDate, R as mediaTitle, U as tmdbImg, V as posterWidthClass, j as cn, z as mediaTypeOf } from "./router-CDLma6dh.mjs";
import { t as RatingBadge } from "./rating-badge-C-_5u0v7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/poster-card-Cu5MWpcC.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Tarjeta de póster clickeable (película, serie o persona).
* Lazy-loading nativo + tamaños según ajustes de visualización.
*/
function PosterCard({ item, forceType, className }) {
	const quality = useSettings((s) => s.imageQuality);
	const size = useSettings((s) => s.posterSize);
	const kind = forceType ?? mediaTypeOf(item);
	const title = mediaTitle(item);
	const year = formatYear(mediaDate(item));
	const role = item.character || item.job;
	const poster = kind === "person" ? tmdbImg(item.profile_path, "w185") : tmdbImg(item.poster_path, posterSizeFor(quality, size));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: kind === "person" ? "/person/$id" : kind === "tv" ? "/tv/$id" : "/movie/$id",
		params: { id: String(item.id) },
		className: cn("poster-card group block", posterWidthClass(size), className),
		"aria-label": role ? `${title} · ${role}` : title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "overflow-hidden rounded-lg bg-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[2/3] bg-surface",
				children: [poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: poster,
					alt: "",
					loading: "lazy",
					decoding: "async",
					className: "size-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-full items-center justify-center text-subtle",
					children: kind === "person" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-10" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "size-10" })
				}), kind !== "person" && item.vote_average ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-2 right-2 rounded-full bg-black/75 px-2 py-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingBadge, { value: item.vote_average })
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-0.5 px-2 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-2 text-sm font-medium leading-snug group-hover:text-gold",
					children: title
				}), role ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-1 text-xs text-muted",
					children: role
				}) : year ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: year
				}) : null]
			})]
		})
	});
}
//#endregion
export { PosterCard as t };
