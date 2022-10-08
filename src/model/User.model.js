const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  dob: {
    type: Date,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: Number,
    default: 1,
  },
  roles: {
    user: {
      type: Number,
      default: 1,
    },
    admin: Number,
  },
});

// mongoose.model('Collection name', 'Your schema')
const User = mongoose.model("User", userSchema);

module.exports = User;
