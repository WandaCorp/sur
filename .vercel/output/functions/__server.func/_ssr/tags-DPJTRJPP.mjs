import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tags-DPJTRJPP.js
/**
* Sistema de etiquetado local: Buena / Regular / Mala.
* La clave es `${mediaType}:${id}` para no mezclar película y serie con el mismo id.
*/
var TAG_META = {
	buena: {
		label: "Buena",
		emoji: "😊",
		hint: "Te gustó"
	},
	regular: {
		label: "Regular",
		emoji: "😐",
		hint: "Ni fu ni fa"
	},
	mala: {
		label: "Mala",
		emoji: "😞",
		hint: "No te convenció"
	}
};
function keyOf(id, mediaType) {
	return `${mediaType}:${id}`;
}
var useTags = create()(persist((set, get) => ({
	tags: {},
	setTag: (id, mediaType, tag) => set((s) => {
		const next = { ...s.tags };
		const k = keyOf(id, mediaType);
		if (!tag) delete next[k];
		else next[k] = tag;
		return { tags: next };
	}),
	getTag: (id, mediaType) => get().tags[keyOf(id, mediaType)]
}), { name: "mhd-tags" }));
//#endregion
export { useTags as n, TAG_META as t };
