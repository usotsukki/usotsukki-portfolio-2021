const sliderInput = document.getElementById("brightness");
let fps;
let userPref;
let dif;
const windowWidth = window.innerWidth;
let connInd =
	windowWidth > 3000
		? 1.03
		: windowWidth > 2000
		? 1.15
		: windowWidth > 1100
		? 1.2
		: windowWidth > 900
		? 1.15
		: windowWidth < 600
		? 1.3
		: 1.1;
let chainingDistance =
	windowWidth > 3000
		? 200
		: windowWidth > 2000
		? 170
		: windowWidth > 1100
		? 140
		: 110;

console.log(window.innerWidth);
const updateSetup = () => {
	const inputVal = localStorage.getItem("p5");
	if (inputVal || inputVal === "0") {
		sliderInput.value = inputVal;
		userPref = inputVal * connInd;
	} else userPref = 1;
	dif = userPref > 7 ? chainingDistance * 1.2 : chainingDistance;
	fps = userPref > 5 ? 60 : 40;
};
const updateVisitorView = () => {
	localStorage.setItem("p5", `${sliderInput.value}`);
	updateSetup();
};

let Speed = 1.7;
let particleSize = 7;
let backgroundColor = "#111116";
//particle speed
let smin = 0 - Speed;
let smax = Speed;

const particles = [];

function setup() {
	updateSetup();
	// performance related
	frameRate(fps);
	const canv = createCanvas(window.innerWidth, window.innerHeight);

	// disable scrolling
	canv.position(0, 0, "fixed");
	// number of particles (related to page size, affects performance)
	const particlesLength = Math.floor(window.innerWidth * 0.07);

	for (let i = 0; i < particlesLength; i++) {
		particles.push(new Particle());
	}
}
function draw() {
	background(backgroundColor);
	for (let i = 0; i < particles.length; i++) {
		const p = particles[i];
		p.update();
		p.draw();
		p.checkParticles(particles.slice(i));
	}
}

// particle core
class Particle {
	// new particle with random XY
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(smin, smax), random(smin, smax));
		this.size = particleSize;
		this.connected = 1;
		this.color = `255,255,255`;
	}
	// move every frame avoiding edges
	update() {
		this.pos.add(this.vel);
		this.edges();
	}
	// display particle
	draw() {
		noStroke();
		fill(`rgba(255, 255, 255, 0.3)`);
		circle(this.pos.x, this.pos.y, this.size);
	}
	// invert movement direction on hitting edge
	edges() {
		if (this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		if (this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
	}
	// connect nearby particles with lines
	checkParticles(particles) {
		const arr = particles;

		// for i loop vs foreach

		for (let i in arr) {
			const p = arr[i];
			const d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);

			if (d < dif) {
				const prev = arr[i - 1 > -1 ? i - 1 : 0];
				let color = `255,255,255`;

				prev.connected *= connInd;
				p.connected *= connInd;

				setTimeout(() => {
					p.connected = userPref;
					prev.connected = userPref;
				}, 25);

				const strokeOpacity = p.connected * 0.025;

				if (p.connected > 7) color = `10,189,198`;
				if (p.connected > 21) color = `255,59,148`;
				if (p.connected > 73) {
					color = `255,0,0`;
					p.connected = 73;
				}

				stroke(`rgba(${color},${strokeOpacity})`);

				line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
			}
		}
	}
}
