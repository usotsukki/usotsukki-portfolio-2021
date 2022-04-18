history.scrollRestoration = "manual";
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

// scrolling animations
scrollSetup();

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

window.onload = function () {
	window.scrollTo(0, 0);
};
function scrollSetup() {
	//name to logo transition
	const name = document.querySelector(".name");
	let nameRect = name.getBoundingClientRect();
	let nameOffset = (nameRect.top + nameRect.bottom) / 2 + window.scrollY;
	console.log(nameOffset);
	const logo = document.querySelector(".logo");
	let logoRect = logo.getBoundingClientRect();
	let logoOffset = (logoRect.top + logoRect.bottom) / 2 + window.scrollY;
	console.log(logoOffset);
	nameToLogo = logoOffset - nameOffset;

	// developer to vertical
	const developer = document.querySelector(".developer");
	const devRect = developer.getBoundingClientRect();
	const devPosX = WIDTH * 0.9 - devRect.right;
	console.log(devPosX, devRect);

	// ScrollMagic controller
	const controller = new ScrollMagic.Controller();
	// hiding unnececary for now stuff
	gsap.to(".logo", { opacity: 0 });

	// timeline
	let tl = new gsap.timeline();
	tl.staggerTo(".name", 5, {
		ease: Power1.easeOut,
		fontSize: 48,

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
	tl.staggerTo(".tbd", 5, {
		opacity: 0,
	});
	tl.staggerTo(".developer", 5, {
		ease: Power1.easeIn,
		rotation: -90,
		fontSize: 160,
		x: devPosX,
		opacity: 0.4,
	});

	let scene = new ScrollMagic.Scene({
		triggerElement: ".s1",
		duration: HEIGHT,
		triggerHook: 0,
	})
		.setTween(tl)
		.setPin(".s1")
		.addTo(controller);
}
