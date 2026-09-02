import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as Route$3 } from "./router-CDLma6dh.mjs";
import { t as MediaDetailsView } from "./media-details-Diw37vfl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/movie._id-D9tbXenL.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Ficha de película: loader con append_to_response para una sola ida a TMDb.
*/
function MoviePage() {
	const data = Route$3.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaDetailsView, {
		data,
		type: "movie"
	});
}
//#endregion
export { MoviePage as component };
