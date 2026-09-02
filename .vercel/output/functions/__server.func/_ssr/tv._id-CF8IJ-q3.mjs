import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Route$1 } from "./router-CDLma6dh.mjs";
import { t as MediaDetailsView } from "./media-details-Diw37vfl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tv._id-CF8IJ-q3.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Ficha de serie: temporadas, episodios, ficha técnica y estadísticas.
*/
function TvPage() {
	const data = Route$1.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaDetailsView, {
		data,
		type: "tv"
	});
}
//#endregion
export { TvPage as component };
