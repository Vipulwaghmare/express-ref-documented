const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User.model");
const logger = require("../logger");

// const ROLES_LIST = {
//   Admin: 0,
//   User: 1,
// };

const register = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  logger.log("info", "Signing up with email: %s", email);

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and Password are required",
    });
  }

  const duplicate = await User.findOne({ email: email }).exec();

  if (duplicate) {
    return res.status(409).json({
      error: "Email is already in use",
    }); // conflict
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    // store user
    const newUser = {
      email: email,
      password: hashPassword,
      // roles: { // role automatically created by mongoDB
      //   User: 1,
      // },
    };
    // create and store new user
    const result = await User.create(newUser);
    //  or
    // const result = new User();
    // newUser.email = email
    // const result = await newUser.save()
    // or
    // const result = new User(newUser)
    // await result.save()

    return res.status(201).json({
      success: "New user created with email: " + email,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

const login = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  logger.log("info", "Logging in with email: %s", email);

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and Password are required",
    });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(400).json({
      error: "No user found",
    });
  }

  // Check password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    // create token
    const accessToken = jwt.sign(
      {
        email: email,
        roles,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10h" },
    );
    const refreshToken = jwt.sign(
      {
        email: email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None", // for cross site
      // secure: true, // for https
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: `User is logged in with email: ${email}`,
      accessToken,
    });
  }
  return res.status(401).json({
    error: "Email and password are not matching",
  });
});

const refreshToken = catchAsyncErrors(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decoded) => {
      if (error || foundUser.email !== decoded.email)
        return res.sendStatus(403);
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          email: foundUser.email,
          roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10h" },
      );
      return res.json({
        accessToken,
      });
    },
  );
});

const test = catchAsyncErrors(async (req, res) => {
  const test = await User.find({ email: "vipulwaghmare222@gmail.com" }).exec();
  console.log(test);
  return res.json({ success: "HI, " + req.email });
});

const logout = catchAsyncErrors(async (req, res) => {
  // ! on client delete accesstoken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  // no refresh token in db
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None", // for cross site
      secure: true, // for https
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.json({
    success: "Successfully logged user out",
  });
});

module.exports = {
  login,
  register,
  logout,
  refreshToken,
  test,
};
