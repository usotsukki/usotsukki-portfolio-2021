import { showMoreLess, getDesc, createDescHtml } from "./utilsH.js";
import { btnsEL } from "./hanoi.js";

document.querySelectorAll(".btn-h").forEach((btn) => btnsEL(btn));
document.querySelector(".learn-more").addEventListener("click", showMoreLess);
createDescHtml(getDesc());
