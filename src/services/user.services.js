const User = require("../model/User.model");

const getUserByEmail = (email) => {
  const user = User.find({ email: email });
  return user;
};

module.exports = {
  getUserByEmail,
};
