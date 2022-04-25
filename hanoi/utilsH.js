const learnMore = document.querySelector(".learn-more");
const warningDiv = document.querySelector(".warning");

const timer = (ms) =>
	new Promise(
		(res) => setTimeout(res, ms),
		(err) => reset
	);

const showMoreLess = () => {
	const value = learnMore.getAttribute("value");
	if (value == "more") {
		learnMore.setAttribute("value", "less");
		learnMore.innerText = "Show less";
		document.querySelector(".desc").classList.remove("d-none");
	} else {
		learnMore.setAttribute("value", "more");
		learnMore.innerText = "Show more";
		document.querySelector(".desc").classList.add("d-none");
	}
};
async function getDesc() {
	const res = await fetch(
		"https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=Tower%20of%20Hanoi%20&exintro=1"
	);
	return await res.json();
}

async function createDescHtml(Promise) {
	const r = await Promise;
	const obj = r?.query?.pages;
	const text = Object.keys(obj);
	document.querySelector(".desc").innerHTML = obj[`${text[0]}`].extract;
}

function warning() {
	warningDiv.classList.remove("d-none");
	warningDiv.classList.remove("invis");
	setTimeout(() => {
		warningDiv.classList.add("invis");
		warningDiv.classList.add("d-none");
	}, 2000);
}

export { showMoreLess, getDesc, timer, warning, createDescHtml };
