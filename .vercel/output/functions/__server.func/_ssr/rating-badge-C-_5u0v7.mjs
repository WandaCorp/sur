import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as Star } from "../_libs/lucide-react.mjs";
import { H as ratingTone, j as cn } from "./router-CDLma6dh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rating-badge-C-_5u0v7.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Badge de puntuación TMDb (0–10) con color semántico.
*/
function RatingBadge({ value, className, size = "sm" }) {
	if (!value) return null;
	const tone = ratingTone(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 font-semibold tabular-nums", size === "lg" ? "text-lg" : "text-xs", tone === "gold" ? "text-gold" : tone === "cyan" ? "text-cyan" : tone === "red" ? "text-red" : "text-muted", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: size === "lg" ? "size-4 fill-current" : "size-3 fill-current" }), value.toFixed(1)]
	});
}
//#endregion
export { RatingBadge as t };
