const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
  },
  dob: {
    type: Date,
  },
  email: {
    type: String,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userSchema);
