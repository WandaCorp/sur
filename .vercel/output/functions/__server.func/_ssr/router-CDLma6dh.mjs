import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { B as notFound, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime, a as Overlay2, c as Title2, d as DialogContent, f as DialogOverlay, h as DialogTrigger, i as Description2, k as Slot, l as Dialog, m as DialogTitle, n as Cancel, o as Portal2, p as DialogPortal, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { i as __exportAll, r as tmdbRequest, t as TmdbHttpError } from "./proxy.server-DqFN8chk.mjs";
import { c as Search, d as Heart, i as TriangleAlert, n as User, p as Clapperboard, r as Tv, s as Settings, t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skeleton-CpxPoaWf.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Utilidades de clase CSS.
* Combina clsx + tailwind-merge para fusionar clases de Tailwind sin conflictos.
*/
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var dateFmt = new Intl.DateTimeFormat("es", {
	day: "numeric",
	month: "long",
	year: "numeric"
});
var yearFmt = new Intl.DateTimeFormat("es", { year: "numeric" });
var moneyFmt = new Intl.NumberFormat("es", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0
});
var compactFmt = new Intl.NumberFormat("es", {
	notation: "compact",
	maximumFractionDigits: 1
});
function formatDate(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return dateFmt.format(d);
}
function formatYear(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return yearFmt.format(d);
}
function formatMoney(value) {
	if (!value) return "—";
	return moneyFmt.format(value);
}
function formatCompact(value) {
	if (value == null) return "—";
	return compactFmt.format(value);
}
/** Convierte minutos a "2h 18min". */
function formatRuntime(minutes) {
	if (!minutes) return "—";
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	if (h <= 0) return `${m}min`;
	if (m === 0) return `${h}h`;
	return `${h}h ${m}min`;
}
function mediaTitle(item) {
	return item.title || item.name || "Sin título";
}
function mediaDate(item) {
	return item.release_date || item.first_air_date;
}
function mediaTypeOf(item) {
	if (item.media_type === "tv" || item.media_type === "person") return item.media_type;
	if (item.media_type === "movie") return "movie";
	if (item.title || item.release_date) return "movie";
	if (item.name || item.first_air_date) return "tv";
	return "movie";
}
/** Color semántico del rating (0–10). */
function ratingTone(vote) {
	if (vote >= 7.5) return "gold";
	if (vote >= 6) return "cyan";
	if (vote >= 4) return "muted";
	return "red";
}
var BASE = "https://image.tmdb.org/t/p";
/** Devuelve la URL absoluta o null si no hay path. */
function tmdbImg(path, size) {
	if (!path) return null;
	return `${BASE}/${size}${path}`;
}
/** Tamaño de póster según ajustes de visualización. */
function posterSizeFor(quality, card) {
	if (card === "sm") {
		if (quality === "low") return "w92";
		if (quality === "high") return "w185";
		return "w154";
	}
	if (card === "lg") {
		if (quality === "low") return "w342";
		if (quality === "high") return "w780";
		return "w500";
	}
	if (quality === "low") return "w185";
	if (quality === "high") return "w500";
	return "w342";
}
/** Backdrop del hero / detalle. */
function backdropSizeFor(quality) {
	if (quality === "low") return "w780";
	if (quality === "high") return "original";
	return "w1280";
}
/** Ancho CSS aproximado del póster según el ajuste de tamaño. */
function posterWidthClass(size) {
	if (size === "sm") return "w-[7.5rem]";
	if (size === "lg") return "w-[13.5rem]";
	return "w-[10.5rem]";
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("skeleton", className),
		"aria-hidden": "true",
		...props
	});
}
function PosterSkeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("aspect-[2/3] w-[10.5rem] rounded-lg", className) });
}
function RowSkeleton({ count = 8 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "row-scroll",
		"aria-hidden": "true",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterSkeleton, {}, i))
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CA1qSuZa.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Funciones de servidor (createServerFn) que el cliente llama como RPC.
* El handler corre solo en el servidor: ahí se importa el proxy con la API key.
*/
/** Un solo viaje a TMDb por ficha: créditos, vídeos, galería, similares y extras. */
var tmdbGet = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("db1b98805a964563bd4cdc015c36f5990884b3c6fa7aef04b7fe02367b386f89"));
var getHomeFeed = createServerFn({ method: "GET" }).validator((d) => d ?? {}).handler(createSsrRpc("4d68bea93269169e9dc5feecc86d62eae051e203833f258945f0c9d9091fdf7d"));
var getMediaDetails = createServerFn({ method: "GET" }).validator((d) => d).handler(createSsrRpc("f32f8193cdcefa03a6f5de0f38cea77dccb54f6cf19dd0dcd082afb8373ecfdc"));
var getPersonDetails = createServerFn({ method: "GET" }).validator((d) => d).handler(createSsrRpc("3011bcbe11cf6eef258f42fd176ebb4fb29c877fba6ada3e4ffa215ba55fc06f"));
var getSeason = createServerFn({ method: "GET" }).validator((d) => d).handler(createSsrRpc("d72f6ea609fcef51c84ad23666737587b2e866adebb9f796a3faeed46965eca0"));
var getCollection = createServerFn({ method: "GET" }).validator((d) => d).handler(createSsrRpc("5ed75dab9c0b836cc49278a08c7890650e24ff71da92887e1c745cb884cb97c9"));
var searchMulti = createServerFn({ method: "GET" }).validator((d) => d).handler(createSsrRpc("0e4107cd84a4b2686e34dec6399b133c0768ba9a6cf7c08685f52a55eb80490e"));
/**
* Ajustes de visualización persistidos en localStorage.
* Controlan secciones visibles, orden, calidad de imagen, tamaño de pósters
* y el interruptor de contenido adulto.
*/
var HOME_SECTIONS = [
	{
		id: "trending",
		label: "En tendencia"
	},
	{
		id: "popularMovies",
		label: "Películas populares"
	},
	{
		id: "topMovies",
		label: "Mejor valoradas"
	},
	{
		id: "nowPlaying",
		label: "En cines"
	},
	{
		id: "upcoming",
		label: "Próximos estrenos"
	},
	{
		id: "popularTv",
		label: "Series populares"
	},
	{
		id: "topTv",
		label: "Series mejor valoradas"
	},
	{
		id: "onAir",
		label: "En emisión"
	},
	{
		id: "action",
		label: "Acción"
	},
	{
		id: "comedy",
		label: "Comedia"
	},
	{
		id: "drama",
		label: "Drama"
	},
	{
		id: "thriller",
		label: "Thriller"
	},
	{
		id: "scifi",
		label: "Ciencia ficción"
	},
	{
		id: "horror",
		label: "Terror"
	},
	{
		id: "animation",
		label: "Animación"
	},
	{
		id: "romance",
		label: "Romance"
	}
];
var useSettings = create()(persist((set) => ({
	hiddenSections: [],
	sort: "popularity",
	imageQuality: "medium",
	posterSize: "md",
	includeAdult: false,
	toggleSection: (id) => set((s) => ({ hiddenSections: s.hiddenSections.includes(id) ? s.hiddenSections.filter((x) => x !== id) : [...s.hiddenSections, id] })),
	setSort: (sort) => set({ sort }),
	setImageQuality: (imageQuality) => set({ imageQuality }),
	setPosterSize: (posterSize) => set({ posterSize }),
	setIncludeAdult: (includeAdult) => set({ includeAdult })
}), { name: "mhd-settings" }));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/button-CC5Hmpfw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Botón del sistema: variantes, tamaños y feedback táctil (scale 0.96).
*/
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-[color,background-color,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-gold text-gold-fg hover:bg-gold/90",
			destructive: "bg-red text-fg hover:bg-red/90",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated",
			ghost: "text-fg hover:bg-elevated",
			link: "text-gold underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CDLma6dh.js
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-wide",
				children: "Algo salió mal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "Ocurrió un error inesperado. Recarga la página o inténtalo más tarde."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-2 inline-flex h-11 items-center rounded-md bg-gold px-5 text-sm font-semibold text-gold-fg transition-transform duration-150 active:scale-[0.96]",
				children: "Volver al inicio"
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TooltipProvider = Provider;
/**
* Providers de cliente: React Query, toasts y tooltips.
*/
function AppProviders({ children }) {
	const [client] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e5,
		gcTime: 18e5,
		retry: 1,
		refetchOnWindowFocus: false
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
			delayDuration: 200,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right",
				richColors: true,
				toastOptions: { className: "bg-surface border-border text-fg" }
			})]
		})
	});
}
/**
* Campo de texto con altura táctil (≥44px) y anillo dorado al foco.
*/
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	suppressHydrationWarning: true,
	className: cn("flex h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "transition-colors duration-150 focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40", "disabled:cursor-not-allowed disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
/**
* Debounce de un valor (búsqueda global) para no disparar TMDb en cada tecla.
*/
function useDebounce(value, delay = 320) {
	const [debounced, setDebounced] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const id = window.setTimeout(() => setDebounced(value), delay);
		return () => window.clearTimeout(id);
	}, [value, delay]);
	return debounced;
}
/**
* Buscador global con autocompletado (debounce 320ms), teclado y atajo ⌘K.
*/
function resultTo(item) {
	const kind = mediaTypeOf(item);
	if (kind === "person") return {
		to: "/person/$id",
		id: String(item.id)
	};
	if (kind === "tv") return {
		to: "/tv/$id",
		id: String(item.id)
	};
	return {
		to: "/movie/$id",
		id: String(item.id)
	};
}
function SearchBar({ compact = false }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(0);
	const debounced = useDebounce(q.trim(), 320);
	const includeAdult = useSettings((s) => s.includeAdult);
	const navigate = useNavigate();
	const boxRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const { data, isFetching } = useQuery({
		queryKey: [
			"search-multi",
			debounced,
			includeAdult
		],
		queryFn: () => searchMulti({ data: {
			q: debounced,
			includeAdult
		} }),
		enabled: debounced.length >= 2
	});
	const results = (data?.results ?? []).slice(0, 8);
	(0, import_react.useEffect)(() => {
		setActive(0);
	}, [debounced, results.length]);
	(0, import_react.useEffect)(() => {
		const onDoc = (e) => {
			if (!boxRef.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				inputRef.current?.focus();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	function goTo(item) {
		const dest = resultTo(item);
		setOpen(false);
		navigate({
			to: dest.to,
			params: { id: dest.id }
		});
	}
	function submit(e) {
		e.preventDefault();
		if (open && results[active]) {
			goTo(results[active]);
			return;
		}
		if (!q.trim()) return;
		setOpen(false);
		navigate({
			to: "/search",
			search: { q: q.trim() }
		});
	}
	function onKeyDown(e) {
		if (!open || debounced.length < 2) {
			if (e.key === "Escape") setOpen(false);
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => Math.max(i - 1, 0));
		} else if (e.key === "Escape") setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: boxRef,
		className: compact ? "relative w-full" : "relative w-full max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			role: "search",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "global-search",
				children: "Buscar películas, series o personas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "global-search",
						ref: inputRef,
						value: q,
						onChange: (e) => {
							setQ(e.target.value);
							setOpen(true);
						},
						onFocus: () => setOpen(true),
						onKeyDown,
						placeholder: "Buscar títulos, series, personas…",
						autoComplete: "off",
						role: "combobox",
						"aria-expanded": open && debounced.length >= 2,
						"aria-controls": "search-suggest",
						"aria-activedescendant": results[active] ? `suggest-${results[active].id}` : void 0,
						className: "pl-9 pr-16"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded border border-border px-1.5 py-0.5 text-[10px] text-subtle sm:inline",
						children: "⌘K"
					})
				]
			})]
		}), open && debounced.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			id: "search-suggest",
			role: "listbox",
			className: "absolute z-40 mt-2 w-full overflow-hidden rounded-lg border border-border bg-surface shadow-card",
			children: [
				isFetching && !results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-3 text-sm text-muted",
					children: "Buscando…"
				}) : null,
				results.map((item, i) => {
					const kind = mediaTypeOf(item);
					const dest = resultTo(item);
					const thumb = kind === "person" ? tmdbImg(item.profile_path, "w92") : tmdbImg(item.poster_path, "w92");
					const Icon = kind === "person" ? User : kind === "tv" ? Tv : Clapperboard;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						role: "option",
						id: `suggest-${item.id}`,
						"aria-selected": i === active,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: dest.to,
							params: { id: dest.id },
							onClick: () => setOpen(false),
							onMouseEnter: () => setActive(i),
							className: cn("flex items-center gap-3 px-3 py-2", i === active ? "bg-elevated" : "hover:bg-elevated"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-10 shrink-0 overflow-hidden rounded-sm bg-elevated",
								children: thumb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: thumb,
									alt: "",
									className: "size-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "m-auto size-4 text-muted" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: mediaTitle(item)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [kind === "person" ? "Persona" : kind === "tv" ? "Serie" : "Película", kind !== "person" && formatYear(mediaDate(item)) ? ` · ${formatYear(mediaDate(item))}` : ""]
								})]
							})]
						})
					}, `${kind}-${item.id}`);
				}),
				!isFetching && !results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-3 text-sm text-muted",
					children: "Sin coincidencias."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "w-full px-3 py-2 text-left text-sm text-gold hover:bg-elevated",
						onClick: () => {
							setOpen(false);
							navigate({
								to: "/search",
								search: { q: debounced }
							});
						},
						children: [
							"Ver todos los resultados de “",
							debounced,
							"”"
						]
					})
				})
			]
		}) : null]
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "right", title, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(100vw,24rem)] flex-col border-border bg-surface shadow-card", "data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" ? "top-0 right-0 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right" : "top-0 left-0 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-2xl tracking-wide",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				className: "rounded-sm p-2 text-muted hover:text-fg",
				"aria-label": "Cerrar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto p-5",
			children
		})]
	})] });
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border transition-colors", "data-[state=checked]:bg-gold data-[state=unchecked]:bg-elevated", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-fg shadow-sm transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5", "data-[state=checked]:bg-gold-fg") })
	});
}
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		decorative,
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		className: cn("fixed inset-0 z-50 bg-black/80", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-6 shadow-card", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-2 text-left", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-display text-2xl tracking-wide", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
/**
* Interruptor de contenido adulto con advertencia previa al activarlo.
*/
function AdultToggle() {
	const includeAdult = useSettings((s) => s.includeAdult);
	const setIncludeAdult = useSettings((s) => s.setIncludeAdult);
	const [open, setOpen] = (0, import_react.useState)(false);
	function onChecked(next) {
		if (next && !includeAdult) {
			setOpen(true);
			return;
		}
		setIncludeAdult(false);
		toast.message("Contenido adulto oculto");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-semibold",
			children: "Contenido para adultos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: "Oculto por defecto. Al activarlo se muestran títulos marcados como adultos en TMDb."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked: includeAdult,
			onCheckedChange: onChecked,
			"aria-label": "Mostrar contenido adulto"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "¿Mostrar contenido adulto?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Vas a ver películas y series que TMDb marca como contenido para adultos. Confirma que eres mayor de edad y quieres activar esta vista." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			onClick: () => {
				setIncludeAdult(true);
				toast.warning("Contenido adulto visible");
			},
			children: "Sí, soy mayor de edad"
		})] })] })
	})] });
}
/**
* Panel de ajustes de visualización: secciones, orden, calidad, pósters y adultos.
*/
var SORTS = [
	{
		id: "popularity",
		label: "Popularidad"
	},
	{
		id: "date",
		label: "Fecha"
	},
	{
		id: "rating",
		label: "Rating"
	}
];
var QUALITY = [
	{
		id: "low",
		label: "Baja"
	},
	{
		id: "medium",
		label: "Media"
	},
	{
		id: "high",
		label: "Alta"
	}
];
var SIZES = [
	{
		id: "sm",
		label: "S"
	},
	{
		id: "md",
		label: "M"
	},
	{
		id: "lg",
		label: "L"
	}
];
function DisplaySettings({ triggerClassName }) {
	const hidden = useSettings((s) => s.hiddenSections);
	const toggleSection = useSettings((s) => s.toggleSection);
	const sort = useSettings((s) => s.sort);
	const setSort = useSettings((s) => s.setSort);
	const imageQuality = useSettings((s) => s.imageQuality);
	const setImageQuality = useSettings((s) => s.setImageQuality);
	const posterSize = useSettings((s) => s.posterSize);
	const setPosterSize = useSettings((s) => s.setPosterSize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			className: triggerClassName,
			"aria-label": "Ajustes de visualización",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
		title: "Ajustes",
		side: "right",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold",
					children: "Secciones del inicio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: HOME_SECTIONS.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: `sec-${sec.id}`,
							className: "text-sm",
							children: sec.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: `sec-${sec.id}`,
							checked: !hidden.includes(sec.id),
							onCheckedChange: () => toggleSection(sec.id)
						})]
					}, sec.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold",
					children: "Ordenar filas por"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSort(s.id),
						className: cn("h-9 rounded-full border px-3 text-sm", sort === s.id ? "border-gold bg-gold text-gold-fg" : "border-border text-muted hover:text-fg"),
						children: s.label
					}, s.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold",
					children: "Calidad de imagen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: QUALITY.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setImageQuality(q.id),
						className: cn("h-9 rounded-full border px-3 text-sm", imageQuality === q.id ? "border-gold bg-gold text-gold-fg" : "border-border text-muted hover:text-fg"),
						children: q.label
					}, q.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-semibold",
					children: "Tamaño de pósters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: SIZES.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPosterSize(q.id),
						className: cn("h-9 min-w-11 rounded-full border px-3 text-sm", posterSize === q.id ? "border-gold bg-gold text-gold-fg" : "border-border text-muted hover:text-fg"),
						children: q.label
					}, q.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdultToggle, {})
			]
		})
	})] });
}
/**
* Favoritos con CRUD en localStorage (sin base de datos).
* Persistencia entre sesiones mediante zustand/persist.
*/
var useFavorites = create()(persist((set, get) => ({
	items: [],
	add: (item) => set((s) => {
		if (s.items.some((x) => x.id === item.id && x.mediaType === item.mediaType)) return s;
		return { items: [{
			...item,
			addedAt: Date.now()
		}, ...s.items] };
	}),
	remove: (id, mediaType) => set((s) => ({ items: s.items.filter((x) => !(x.id === id && x.mediaType === mediaType)) })),
	toggle: (item) => {
		const exists = get().has(item.id, item.mediaType);
		if (exists) get().remove(item.id, item.mediaType);
		else get().add(item);
		return !exists;
	},
	has: (id, mediaType) => get().items.some((x) => x.id === id && x.mediaType === mediaType),
	clear: () => set({ items: [] })
}), { name: "mhd-favorites" }));
/**
* Evita mismatches de hidratación al leer localStorage (favoritos, ajustes).
*/
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setHydrated(true), []);
	return hydrated;
}
/**
* Cabecera sticky: logo MHD+, navegación, buscador, favoritos y ajustes.
*/
var NAV = [
	{
		to: "/",
		label: "Inicio"
	},
	{
		to: "/catalog",
		label: "Películas",
		search: { type: "movie" }
	},
	{
		to: "/catalog",
		label: "Series",
		search: { type: "tv" }
	},
	{
		to: "/favorites",
		label: "Favoritos"
	}
];
function Header() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const search = useRouterState({ select: (s) => s.location.search });
	const count = useFavorites((s) => s.items.length);
	const hydrated = useHydrated();
	const [open, setOpen] = (0, import_react.useState)(false);
	function isActive(to, extra) {
		if (to === "/") return pathname === "/";
		if (to === "/catalog" && extra?.type) {
			const type = search.type;
			return pathname === "/catalog" && (type ?? "movie") === extra.type;
		}
		return pathname === to;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex shrink-0 items-baseline gap-0.5",
					"aria-label": "MHD+ inicio",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-3xl leading-none tracking-wide",
						children: "MHD"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-3xl leading-none text-gold",
						children: "+"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-4 hidden items-center gap-1 md:flex",
					"aria-label": "Principal",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						search: item.search,
						className: cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive(item.to, item.search) ? "text-gold" : "text-muted hover:text-fg"),
						children: item.label
					}, item.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ml-auto hidden flex-1 justify-end md:flex md:max-w-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1 md:ml-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/favorites",
							className: "relative inline-flex size-11 items-center justify-center rounded-md hover:bg-elevated",
							"aria-label": "Favoritos",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5" }), hydrated && count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1.5 right-1.5 min-w-4 rounded-full bg-red px-1 text-center text-[10px] font-bold leading-4",
								children: count
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisplaySettings, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "md:hidden",
							"aria-label": open ? "Cerrar menú" : "Abrir menú",
							"aria-expanded": open,
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-4 py-3 md:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-3 flex flex-col",
				"aria-label": "Móvil",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					search: item.search,
					onClick: () => setOpen(false),
					className: cn("rounded-md px-2 py-3 text-sm font-medium", isActive(item.to, item.search) ? "text-gold" : "text-fg"),
					children: item.label
				}, item.label))
			})]
		}) : null]
	});
}
/**
* Pie con atribución obligatoria a TMDb (logo + disclaimer).
*/
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-16 border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[90rem] flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "font-display text-lg tracking-wide text-fg",
				children: ["MHD", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gold",
					children: "+"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 text-sm text-muted",
				children: "Tu universo de cine y series."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-xs leading-relaxed text-muted",
				children: "Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "https://www.themoviedb.org/",
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex items-center gap-2 text-xs text-muted hover:text-cyan",
				"aria-label": "The Movie Database",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TmdbMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Datos por TMDb" })]
			})]
		})
	});
}
/** Marca simplificada de TMDb (cian oficial #00A8E1) para la atribución. */
function TmdbMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 34",
		className: "h-6 w-auto",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "48",
			height: "34",
			rx: "6",
			fill: "#00A8E1"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "24",
			y: "22",
			textAnchor: "middle",
			fill: "#0a0a0a",
			fontSize: "11",
			fontWeight: "800",
			fontFamily: "Manrope, system-ui, sans-serif",
			children: "TMDb"
		})]
	});
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#contenido",
				className: "skip-link",
				children: "Saltar al contenido"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "contenido",
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var styles_default = "/assets/styles-Bu9jjcr1.css";
/**
* Documento raíz: SEO, fuentes, providers y marco de la app.
* No incluye og:* / twitter:card — los inyecta el plugin PWA.
*/
var APP_NAME = "MHD+";
var DESCRIPTION = "MHD+ es tu base de datos de películas y series: fichas, trailers, reparto, estadísticas y favoritos, impulsada por TMDb.";
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${APP_NAME} · Películas y series` },
			{
				name: "description",
				content: DESCRIPTION
			},
			{
				name: "theme-color",
				content: "#000000"
			},
			{
				name: "application-name",
				content: APP_NAME
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://image.tmdb.org"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		className: "dark antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
/**
* Feed principal: hero carousel, géneros y filas horizontales por categoría.
* El loader trae el feed sin adulto; si el usuario lo activa se refetch.
*/
var $$splitComponentImporter$6 = () => import("./routes-BifFD8yN.mjs");
var Route$7 = createFileRoute("/")({
	loader: () => getHomeFeed({ data: {} }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	pendingComponent: HomePending
});
function HomePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[min(88vh,42rem)] rounded-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[90rem] space-y-10 px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowSkeleton, {})]
	})] });
}
/**
* Catálogo por categoría con infinite scroll y filtros de orden / año / tipo.
*/
var $$splitComponentImporter$5 = () => import("./catalog-8dQ9VW7D.mjs");
function str$1(v) {
	if (v == null || v === "") return void 0;
	return String(v);
}
var Route$6 = createFileRoute("/catalog")({
	validateSearch: (s) => ({
		type: s.type === "tv" ? "tv" : "movie",
		genre: str$1(s.genre),
		sort: str$1(s.sort) ?? "popularity.desc",
		year: str$1(s.year)
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Catálogo · MHD+" }, {
		name: "description",
		content: "Explora películas y series por género, año y popularidad."
	}] })
});
/**
* Página de favoritos: listar, filtrar, quitar y persistir en localStorage.
*/
var $$splitComponentImporter$4 = () => import("./favorites-B7pnY-iS.mjs");
var Route$5 = createFileRoute("/favorites")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Favoritos · MHD+" }, {
		name: "description",
		content: "Tu lista de películas y series favoritas, guardada en este dispositivo."
	}] })
});
/**
* Búsqueda global con filtros: tipo, año, género y orden.
*/
var $$splitComponentImporter$3 = () => import("./search-DpRJheAN.mjs");
function str(v) {
	if (v == null || v === "") return void 0;
	return String(v);
}
var Route$4 = createFileRoute("/search")({
	validateSearch: (s) => ({
		q: str(s.q) ?? "",
		type: s.type === "movie" || s.type === "tv" || s.type === "person" ? s.type : "all",
		year: str(s.year),
		genre: str(s.genre),
		sort: str(s.sort) ?? "popularity.desc"
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Buscar · MHD+" }] })
});
/**
* Ficha de película: loader con append_to_response para una sola ida a TMDb.
*/
var $$splitComponentImporter$2 = () => import("./movie._id-D9tbXenL.mjs");
var Route$3 = createFileRoute("/movie/$id")({
	loader: async ({ params }) => {
		try {
			return await getMediaDetails({ data: {
				id: params.id,
				type: "movie"
			} });
		} catch (err) {
			const msg = err instanceof Error ? err.message.toLowerCase() : "";
			if (msg.includes("404") || msg.includes("not be found") || msg.includes("not found")) throw notFound();
			throw err;
		}
	},
	head: ({ loaderData }) => {
		const d = loaderData;
		return { meta: [{ title: d?.title ? `${d.title} · MHD+` : "Película · MHD+" }, {
			name: "description",
			content: d?.overview?.slice(0, 160) || "Ficha de película en MHD+."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	pendingComponent: DetailsPending$1
});
function DetailsPending$1() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 rounded-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-[90rem] px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-52" })
	})] });
}
/**
* Ficha de actor/actriz: biografía, filmografía clickeable e imágenes.
*/
var $$splitComponentImporter$1 = () => import("./person._id-DllIlODV.mjs");
var Route$2 = createFileRoute("/person/$id")({
	loader: async ({ params }) => {
		try {
			return await getPersonDetails({ data: { id: params.id } });
		} catch (err) {
			const msg = err instanceof Error ? err.message.toLowerCase() : "";
			if (msg.includes("404") || msg.includes("not be found") || msg.includes("not found")) throw notFound();
			throw err;
		}
	},
	head: ({ loaderData }) => {
		const d = loaderData;
		return { meta: [{ title: d?.name ? `${d.name} · MHD+` : "Persona · MHD+" }, {
			name: "description",
			content: d?.biography?.slice(0, 160) || "Ficha de persona en MHD+."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	pendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-[90rem] px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 w-56" })
	})
});
/**
* Ficha de serie: temporadas, episodios, ficha técnica y estadísticas.
*/
var $$splitComponentImporter = () => import("./tv._id-CF8IJ-q3.mjs");
var Route$1 = createFileRoute("/tv/$id")({
	loader: async ({ params }) => {
		try {
			return await getMediaDetails({ data: {
				id: params.id,
				type: "tv"
			} });
		} catch (err) {
			const msg = err instanceof Error ? err.message.toLowerCase() : "";
			if (msg.includes("404") || msg.includes("not be found") || msg.includes("not found")) throw notFound();
			throw err;
		}
	},
	head: ({ loaderData }) => {
		const d = loaderData;
		return { meta: [{ title: d?.name ? `${d.name} · MHD+` : "Serie · MHD+" }, {
			name: "description",
			content: d?.overview?.slice(0, 160) || "Ficha de serie en MHD+."
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	pendingComponent: DetailsPending
});
function DetailsPending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 rounded-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-[90rem] px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-52" })
	})] });
}
/**
* Función serverless de proxy TMDb.
* Ruta: GET /api/tmdb/<path>?query...
* Ejemplo: /api/tmdb/movie/popular?page=1
*
* En Vercel esto se despliega como Serverless Function (Nitro preset).
* La API key se lee de TMDB_API_KEY — nunca viaja al cliente.
*/
var Route = createFileRoute("/api/tmdb/$")({ server: { handlers: { GET: async ({ params, request }) => {
	try {
		const path = `/${params._splat || ""}`.replace(/\/+/g, "/");
		if (path === "/") return Response.json({ error: "Indica un endpoint de TMDb, p. ej. /api/tmdb/movie/popular" }, { status: 400 });
		const url = new URL(request.url);
		const query = {};
		url.searchParams.forEach((v, k) => {
			if (k !== "api_key") query[k] = v;
		});
		const data = await tmdbRequest(path, query);
		return Response.json(data, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } });
	} catch (err) {
		const status = err instanceof TmdbHttpError && err.status ? err.status : 502;
		const message = err instanceof Error ? err.message : "Error de conexión con TMDb";
		return Response.json({ error: message }, { status });
	}
} } } });
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	CatalogRoute: Route$6.update({
		id: "/catalog",
		path: "/catalog",
		getParentRoute: () => Route$8
	}),
	FavoritesRoute: Route$5.update({
		id: "/favorites",
		path: "/favorites",
		getParentRoute: () => Route$8
	}),
	SearchRoute: Route$4.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$8
	}),
	MovieIdRoute: Route$3.update({
		id: "/movie/$id",
		path: "/movie/$id",
		getParentRoute: () => Route$8
	}),
	PersonIdRoute: Route$2.update({
		id: "/person/$id",
		path: "/person/$id",
		getParentRoute: () => Route$8
	}),
	TvIdRoute: Route$1.update({
		id: "/tv/$id",
		path: "/tv/$id",
		getParentRoute: () => Route$8
	}),
	ApiTmdbSplatRoute: Route.update({
		id: "/api/tmdb/$",
		path: "/api/tmdb/$",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
/**
* Página 404 del router.
*/
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-7xl tracking-widest text-gold",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "No encontramos esa ficha"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-muted",
				children: "El título, la persona o la categoría que buscas no existe o se movió."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-2 inline-flex h-11 items-center rounded-md bg-gold px-5 text-sm font-semibold text-gold-fg",
				children: "Ir al inicio"
			})
		]
	});
}
/**
* Fábrica del router de TanStack. El plugin exige el export nombrado getRouter.
*/
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFoundPage,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { backdropSizeFor as A, posterSizeFor as B, getHomeFeed as C, PosterSkeleton as D, useSettings as E, formatRuntime as F, ratingTone as H, formatYear as I, mediaDate as L, formatCompact as M, formatDate as N, RowSkeleton as O, formatMoney as P, mediaTitle as R, getCollection as S, tmdbGet as T, tmdbImg as U, posterWidthClass as V, AlertDialogHeader as _, Route$4 as a, Button as b, useHydrated as c, AlertDialog as d, AlertDialogAction as f, AlertDialogFooter as g, AlertDialogDescription as h, Route$3 as i, cn as j, Skeleton as k, useFavorites as l, AlertDialogContent as m, Route$1 as n, Route$6 as o, AlertDialogCancel as p, Route$2 as r, Route$7 as s, router_exports as t, AdultToggle as u, AlertDialogTitle as v, getSeason as w, HOME_SECTIONS as x, Input as y, mediaTypeOf as z };
