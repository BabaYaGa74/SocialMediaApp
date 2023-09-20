const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//@desc   Likes the post
//@routes POST /api/like/:postId/like
//@access private
const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  console.log(userId);
  const post = await Post.findById(postId);
  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
    await post.save();
  }
  res.json({ likesCount: post.likes.length });
});

//@desc   Unlikes the post
//@routes Delete /api/like/:postId/unlike
//@access private
const unlikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  const index = post.likes.indexOf(userId);
  if (index !== -1) {
    post.likes.splice(index, 1);
    await post.save();
  }

  res.json({ likesCount: post.likes.length });
});

module.exports = {
  likePost,
  unlikePost,
};
