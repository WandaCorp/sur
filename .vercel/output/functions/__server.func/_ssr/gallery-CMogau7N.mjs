import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, d as DialogContent$1, f as DialogOverlay$1, l as Dialog$1, m as DialogTitle$1, p as DialogPortal$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { h as ChevronLeft, m as ChevronRight, t as X } from "../_libs/lucide-react.mjs";
import { U as tmdbImg, j as cn } from "./router-CDLma6dh.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gallery-CMogau7N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center gap-1 rounded-lg bg-elevated p-1 text-muted", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap", "transition-colors data-[state=active]:bg-surface data-[state=active]:text-gold", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-5 focus-visible:outline-none", className),
		...props
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, showClose = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[min(96vw,56rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-surface p-6 shadow-card", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props,
		children: [children, showClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-3 right-3 rounded-sm p-2 text-muted hover:text-fg",
			"aria-label": "Cerrar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		}) : null]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-2xl tracking-wide text-fg", className),
		...props
	});
}
/**
* Galería de backdrops y pósters con lightbox (teclado y botones).
*/
function ImageGallery({ backdrops, posters }) {
	const shots = [...backdrops.map((i) => ({
		...i,
		kind: "backdrop"
	})), ...posters.map((i) => ({
		...i,
		kind: "poster"
	}))];
	const [open, setOpen] = (0, import_react.useState)(false);
	const [idx, setIdx] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + shots.length) % shots.length);
			if (e.key === "ArrowRight") setIdx((i) => (i + 1) % shots.length);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, shots.length]);
	if (!shots.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No hay imágenes disponibles."
	});
	const current = shots[idx];
	const full = tmdbImg(current.file_path, "original");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4",
		children: shots.slice(0, 12).map((img, i) => {
			const src = tmdbImg(img.file_path, img.kind === "poster" ? "w342" : "w780");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("overflow-hidden rounded-md bg-elevated", img.kind === "poster" ? "aspect-[2/3]" : "aspect-video"),
				onClick: () => {
					setIdx(i);
					setOpen(true);
				},
				"aria-label": `Abrir imagen ${i + 1}`,
				children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					loading: "lazy",
					className: "size-full object-cover"
				}) : null
			}, img.file_path + i);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showClose: true,
			className: "w-[min(96vw,72rem)] max-w-none border-0 bg-transparent p-0 shadow-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "sr-only",
				children: [
					"Imagen ",
					idx + 1,
					" de ",
					shots.length
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-center",
				children: [
					full ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: full,
						alt: "",
						className: "max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
					}) : null,
					shots.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute left-2 size-11 rounded-full bg-black/60 text-fg",
						"aria-label": "Anterior",
						onClick: () => setIdx((i) => (i - 1 + shots.length) % shots.length),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mx-auto size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute right-2 size-11 rounded-full bg-black/60 text-fg",
						"aria-label": "Siguiente",
						onClick: () => setIdx((i) => (i + 1) % shots.length),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "mx-auto size-6" })
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs tabular-nums",
						children: [
							idx + 1,
							" / ",
							shots.length
						]
					})
				]
			})]
		})
	})] });
}
//#endregion
export { TabsTrigger as a, TabsList as i, Tabs as n, TabsContent as r, ImageGallery as t };
