const express = require("express");
const { register, login, logout } = require("../controllers/auth");
const errorHandler = require("../middleware/errorHandler");

const authRouter = express.Router();

authRouter.route("/register").post(register, errorHandler);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);

module.exports = authRouter;
