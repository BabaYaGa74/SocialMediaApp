const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
//@desc   Gets the user
//@routes GET /api/users/user/:id
//@access private
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  const { password, ...info } = user._doc;
  if (user) {
    res.status(200).json({
      message: "User found successfully",
      info,
    });
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

//@desc   Updates the existing user
//@routes PUT /api/users/user/:id
//@access private
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let {
    username,
    password,
    name,
    email,
    picture,
    coverPicture,
    website,
    instagram,
    facebook,
    country,
  } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }
  const user = await User.findByIdAndUpdate(
    id,
    {
      username,
      name,
      password,
      email,
      picture,
      coverPicture,
      website,
      instagram,
      facebook,
      country,
    },
    { new: true }
  );
  if (user) {
    generateToken(res, user._id, user.username, user.picture, user.name);
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } else {
    res.status(400);
    throw new Error("Error occured during update");
  }
});

//@desc   Deletes the existing user
//@routes DELETE /api/users/user/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  if (deletedUser) {
    const deletedComments = await Comment.deleteMany({ userId: id });
    const deletedPosts = await Post.deleteMany({ userId: id });
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      message: "User deleted with comments and posts successfully",
      deletedPosts,
      deletedComments,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

//@desc   Changes the existing password
//@routes PUT /api/users/user/pass/:id
//@access private
const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { password, newPassword } = req.body;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User Doesn't Exists");
  }
  const matched = await user.matchPassword(password);

  if (user && matched) {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);
  } else {
    res.status(400);
    throw new Error("Invalid password");
  }

  const updatePassword = await User.findByIdAndUpdate(id, {
    password: newPassword,
  });
  if (updatePassword) {
    res.status(200).json(updatePassword);
  } else {
    res.status(400);
    throw new Error("Cannot update User");
  }
});

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  changePassword,
};
