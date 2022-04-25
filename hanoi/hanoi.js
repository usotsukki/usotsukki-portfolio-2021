import { timer, warning } from "./utilsH.js";

const btns = document.querySelectorAll(".btn-h");
const towers = document.querySelectorAll(".tower");
const input = document.querySelector("#height");

let speed = 500;
const faster = () => (speed *= 0.5);

const btnsEL = (btn) => {
	btn.addEventListener("click", () => {
		setTimeout(() => {
			document.activeElement.blur();
		}, 300);
		const btnId = btn.getAttribute("id");
		switch (btnId) {
			case "start":
				btn.disabled = true;
				setTimeout(() => (btn.disabled = false), 500);
				return start();
			case "next":
				return next();
			case "increase-speed":
				return faster();
			case "reset":
				return reset();
		}
	});
};
async function start() {
	const height = parseInt(input.value);

	if (!height || height < 1 || height > 8) {
		return warning();
	}

	await buildTower(height);
	input.classList.add("d-none");
	btns[1].classList.add("d-none");
	btns[0].classList.remove("d-none");
	btns[2].classList.remove("d-none");
}
async function next() {
	btns[2].classList.add("d-none");
	btns[3].classList.remove("d-none");
	btns[3].classList.remove("o-none");

	await towerOfHanoi(
		towers[0].children.length,
		towers[0],
		towers[2],
		towers[1]
	).catch((err) => reset);
	await timer(500);
	btns[3].classList.add("o-none");
}
function reset() {
	input.classList.remove("d-none");
	input.value = "";
	btns[1].classList.remove("d-none");
	btns[0].classList.add("d-none");
	btns[2].classList.add("d-none");
	btns[3].classList.remove("o-none");
	btns[3].classList.add("d-none");
	towers.forEach((tower) => (tower.innerHTML = ""));
	speed = 500;
}

async function buildTower(n) {
	for (let i = 0; i < n; i++) {
		const layer = document.createElement("div");
		layer.classList.add("layer");
		layer.style = `width: ${1000 - i * 100}%; background-color: var(--tc${i})`;
		towers[0].appendChild(layer);
		await timer(75);
	}
}

async function towerOfHanoi(n, startTower, targetTower, midTower) {
	if (n == 0) return;
	await towerOfHanoi(n - 1, startTower, midTower, targetTower);
	await timer(speed);
	targetTower.appendChild([...startTower.children].pop());
	await towerOfHanoi(n - 1, midTower, targetTower, startTower);
}

export { start, next, reset, btnsEL };
