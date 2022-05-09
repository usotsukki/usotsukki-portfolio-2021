import { scrollSetup } from "./animations.js";
history.scrollRestoration = "manual";

window.onload = () => {
	window.scrollTo(0, 0);
	scrollSetup();
};

document.getElementById("prj").addEventListener("click", () => {
	window.scrollBy({
		top: windowHeight * 1.5,
		left: 270,
		behavior: "smooth",
	});
});
