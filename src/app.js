import { scrollSetup } from "./animations.js";

history.scrollRestoration = "manual";

window.onload = function () {
	window.scrollTo(0, 0);
	scrollSetup();
};
