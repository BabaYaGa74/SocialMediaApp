const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
//@desc   Registers the user
//@routes POST /api/auth/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password, picture } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({ username, name, email, password, picture });
  if (user) {
    generateToken(res, user._id, user.username, user.picture, user.name);
    res.status(201).json({
      message: "User created Successfully!",
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Registration Failed!");
  }
});

//@desc   Authenticates the user
//@routes POST /api/auth/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error("User Doesn't Exists");
  }
  const matched = await user.matchPassword(password);

  if (user && matched) {
    generateToken(res, user._id, user.username, user.picture, user.name);
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

//@desc   Logs out of the app
//@routes POST /api/auth/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({ message: "Logged Out Successfully!" });
});

//@desc   Checks for the user
//@routes GET /api/auth/refetch
//@access private
const getUser = asyncHandler(async (req, res) => {
  let token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
    if (err) return res.status(404).json(err);
    res.status(200).json(data);
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
};
