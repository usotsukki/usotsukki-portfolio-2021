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
	const devPosX = WIDTH - (devRect.right + (window.innerWidth - WIDTH) / 2);

	// ScrollMagic controller
	const controller = new ScrollMagic.Controller();
	// hiding unnececary for now stuff

	// timeline
	let tl = new gsap.timeline();

	// transition Name to Logo
	tl.staggerTo(".my-name-is", 2, { opacity: 0, ease: Power1.easeOut });
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
		fontSize: convertRemToPixels(8),
		rotation: -90,
		x: devPosX,
		opacity: 0.3,
	});
	//nav transition {
	tl.staggerTo(".nav-fs", 5, {
		x: convertRemToPixels(5),
		opacity: 0,
	});

	// Projects to front-panel
	tl.staggerTo(".projects", 5, {
		opacity: 1,
		x: -((window.innerWidth - WIDTH) / 2 + convertRemToPixels(5)),
	});
	tl.staggerTo(".link-bar", 5, {
		opacity: 0.7,
		y: convertRemToPixels(4),
		css: {
			position: "absolute",
			bottom: "1rem",
			left: "50%",
			transform: "translateX(-50%)",
			width: "200px",
			display: "flex",
			height: "100px",
			gap: "3rem",
			opacity: 1,
		},
	});

	// chain all to scroll
	let scene = new ScrollMagic.Scene({
		triggerElement: "main",
		duration: HEIGHT,
		triggerHook: 0,
	})
		.setTween(tl)
		.setPin("main")
		.addTo(controller);
}
