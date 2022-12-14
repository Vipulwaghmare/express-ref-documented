import express from "express";
import { register, login, logout } from "../controllers/auth.controller";
import errorHandler from "../middleware/errorHandler";

const authRouter = express.Router();

authRouter.route("/register").post(register, errorHandler);
authRouter.route("/login").post(login);
authRouter.route("/logout").get(logout);

export default authRouter;
