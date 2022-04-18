const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	console.log("here");
	res.render("index", { text: "contact" });
});

module.exports = router;
