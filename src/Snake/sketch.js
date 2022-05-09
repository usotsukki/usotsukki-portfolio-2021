let blocksX = 40;
let blocksY = 20;
let maxBlocks = 2000;
let blockSize;
let xOffset = 0;
let yOffset = 0;
let s;
let noDieMode = true;
let pause = false;
let speedMultiplier = 1;
let hc;
let outlineLength = 3;
let welcomeText;
let previousHeadPositions = [];

function setup() {
	window.canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	window.canvas.style("z-index: -1;opacity:.5");
	setBlocks();
	blockSize = min(width / blocksX, height / blocksY);
	outlineLength = blockSize / 15;
	s = new Snake();
	hc = new HamiltonianCycle(blocksX, blocksY);
	s.resetOnHamiltonian(hc.cycle);
	frameRate(30);
}

function setBlocks() {
	let testBlockSize = 1;
	while (true) {
		if (
			floor(canvas.width / testBlockSize) *
				floor(canvas.height / testBlockSize) <
			maxBlocks
		) {
			blockSize = testBlockSize;
			blocksX =
				floor(canvas.width / blockSize) - (floor(canvas.width / blockSize) % 2);
			blocksY =
				floor(canvas.height / blockSize) -
				(floor(canvas.height / blockSize) % 2);
			return;
		} else {
			testBlockSize++;
		}
	}
}

function draw() {
	if (!pause) {
		background("#111116");
		textAlign(CENTER, CENTER);
		fill(255);
		noStroke();
		textSize(100);

		fill(15);
		rect(0, 0, width, yOffset);
		rect(0, 0, xOffset, height);
		rect(width, height, -width, -yOffset);
		rect(width, height, -xOffset, -height);

		push();
		translate(xOffset, yOffset);
		fill(0);
		s.show();
		for (let i = 0; i < speedMultiplier; i++) {
			s.update();
		}
		pop();
	}
}

function keyPressed() {
	switch (keyCode) {
		case UP_ARROW:
			s.velX = 0;
			s.velY = -1;
			pause = false;
			frameRate(30);
			break;
		case DOWN_ARROW:
			s.velX = 0;
			s.velY = 1;
			pause = false;
			frameRate(10);
			break;
	}
	switch (key) {
		case " ":
			speedMultiplier = 10;
			break;
	}
}

function keyReleased() {
	switch (key) {
		case " ":
			speedMultiplier = 1;
	}
}
