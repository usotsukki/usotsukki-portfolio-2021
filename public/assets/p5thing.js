const particles = [];

let Speed = 2;

let particleSize = 7;
let backgroundColor = "#111116";

//particle speed
let smin = 0 - Speed;
let smax = Speed;

function setup() {
	// performance related
	frameRate(30);
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
	particles.forEach((p, index) => {
		p.update();
		p.draw();
		p.checkParticles(particles.slice(index));
	});
}

// particle core
class Particle {
	// new particle with random XY
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(smin, smax), random(smin, smax));
		this.size = particleSize;
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
		particles.forEach((p) => {
			const d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
			if (d < 150) {
				stroke(`rgba(255,255,255,.1)`);
				line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
				return;
			}
		});
	}
}
