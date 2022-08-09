const express = require("express");
const User = require("./model/User");

require("dotenv").config();
// require("./config/database").connect();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("<h2>Hello!</h2>");
});

app.post("/signup", async ({ body }, res) => {
	const { firstname, lastname, email, password } = body;
	if (!(email && password && firstname && lastname)) {
		res.status(400).json({
			message: "All fields are required"
		});
	}
	const existingUser = await User.findOne({ email });

	if (existingUser)
		res.status(401).send({ message: "Email Is Already in use" });
});

module.exports = app;
