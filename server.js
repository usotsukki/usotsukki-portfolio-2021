const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.get("/", (req, res) => {
	console.log("here");
	res.render("index", { text: "world!" });
});
const contactRouter = require("./routes/contact.js");

app.use("/contact", contactRouter);

app.listen(5500);
