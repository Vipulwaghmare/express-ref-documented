const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("./email.controller");
const logger = require("../logger");

const register = catchAsyncErrors(async (req, res) => {
  throw Error("Yo");
  res.end("register");
});

const login = catchAsyncErrors(async (req, res) => {
  // ! Send mail
  // const data = {
  //   to: 'vipulwaghmare222@gmail.com',
  //   subject: 'Test',
  //   text: 'Text whre will this be',
  //   html: '<h1>Hello this is h1 tag</h1>'
  // }
  // const test = sendMail(data)
  // res.send(test);
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
