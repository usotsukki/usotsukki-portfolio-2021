import { scrollSetup } from "./animations.js";

history.scrollRestoration = "manual";

window.onload = () => {
	window.scrollTo(0, 0);
	scrollSetup();
};
