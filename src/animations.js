function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function scrollSetup() {
	const HEIGHT = window.innerHeight;
	const WIDTH = document.querySelector(".flex-container").clientWidth;

	//name to logo transition
	const name = document.querySelector(".name");
	const logo = document.querySelector(".logo");
	let nameRect = name.getBoundingClientRect();
	let nameOffset = (nameRect.top + nameRect.bottom) / 2 + window.scrollY;

	let logoRect = logo.getBoundingClientRect();
	let logoOffset = (logoRect.top + logoRect.bottom) / 2 + window.scrollY;

	const nameToLogo = logoOffset - nameOffset;

	// developer to vertical
	const developer = document.querySelector(".developer");
	const devRect = developer.getBoundingClientRect();
	const devPosX = WIDTH - (devRect.right - (window.innerWidth - WIDTH) / 2);

	// ScrollMagic controller
	const controller = new ScrollMagic.Controller();
	// hiding unnececary for now stuff

	// timeline
	let tl = new gsap.timeline();

	// transition Name to Logo
	tl.staggerTo(".name", 5, {
		ease: Power1.easeOut,
		fontSize: convertRemToPixels(3),

		y: nameToLogo,
		x: 0,
	});

	tl.staggerTo(".logo", 1, {
		opacity: 100,
	});
	tl.staggerTo(".name", 5, {
		ease: Power1,
		opacity: 0,
	});

	// remove unnecesary text from front-panel
	tl.staggerTo(".tbd", 2, {
		opacity: 0,
	});

	// WEB-DEVELOPER rotation
	tl.staggerTo(".developer", 5, {
		ease: Power1.easeIn,
		rotation: -90,
		fontSize: convertRemToPixels(8),
		x: devPosX,
		opacity: 0.3,
	});

	// Projects to front-panel
	tl.staggerTo(".projects", 15, {
		opacity: 1,
		x: -((window.innerWidth - WIDTH) / 2 + convertRemToPixels(5)),
	});

	// chain all to scroll
	let scene = new ScrollMagic.Scene({
		triggerElement: "body",
		duration: HEIGHT,
		triggerHook: 0,
	})
		.setTween(tl)
		.setPin("body")
		.addTo(controller);
}
