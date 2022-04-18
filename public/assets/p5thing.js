const particles = [];

let Speed = 2;

let particleSize = 7;
let backgroundColor = "#111116";

// transition();

let smin = 0 - Speed;
let smax = Speed;

function transition() {
	Speed *= 5;
	particleSize *= 20;

	backgroundColor = "#11111601";
}

function setup() {
	frameRate(30);
	const canv = createCanvas(window.innerWidth, window.innerHeight);

	canv.position(0, 0, "fixed");
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

class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(smin, smax), random(smin, smax));
		this.size = particleSize;
	}
	update() {
		this.pos.add(this.vel);
		this.edges();
	}
	draw() {
		noStroke();

		fill(`rgba(255, 255, 255, 0.3)`);
		circle(this.pos.x, this.pos.y, this.size);
	}
	edges() {
		if (this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		if (this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
	}
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
