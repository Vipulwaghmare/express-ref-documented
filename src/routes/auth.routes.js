const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
  test,
} = require("../controllers/auth.controller");
const { verifyJWT } = require("../middleware/auth");

const authRouter = express.Router();

// * Authentication
// Who someone is
// * Authorization
// Which stuff he has access to

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/refreshToken").post(refreshToken);
authRouter.route("/logout").get(logout);

authRouter.route("/test").post([verifyJWT, test]);

module.exports = authRouter;
