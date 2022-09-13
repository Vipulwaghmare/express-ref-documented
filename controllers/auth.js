const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.register = catchAsyncErrors(async (req, res, next) => {
  throw Error("Yo");
  res.end("register");
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  res.send("login");
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.send("logout");
});
