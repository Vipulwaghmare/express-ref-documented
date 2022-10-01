const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("./email.controller");
const logger = require("../logger");

const register = catchAsyncErrors(async (req, res) => {
  throw Error("This is error");
  // res.send("register");
});

const login = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
  }
  logger.info("Provider invalid email or password");
  res.send("Invalid Email or Password");
});

const logout = catchAsyncErrors(async (req, res) => {
  res.send("logout");
});

module.exports = {
  login,
  register,
  logout,
};
