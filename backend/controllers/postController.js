const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//@desc   Creates new post
//@routes POST /api/post/createPost
//@access private
const createPost = asyncHandler(async (req, res) => {
  const { desc, photo, username, userId, profilePic } = req.body;
  const newPost = await Post.create({
    desc,
    photo,
    username,
    userId,
    profilePic,
  });
  if (newPost) {
    res.status(200).json({ message: "Post Created Successfully!", newPost });
  } else {
    res.status(400);
    throw new Error("Failed to create Post");
  }
});

//@desc   updates the post
//@routes PUT /api/post/update/:id
//@access private
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { desc, photo, username, userId } = req.body;
  const content = { desc, photo, username, userId };

  const updatedPost = await Post.findByIdAndUpdate(id, content, { new: true });
  if (updatedPost) {
    res
      .status(200)
      .json({ message: "Post updated Successfully!", updatedPost });
  } else {
    res.status(400);
    throw new Error("Failed to update Post");
  }
});

//@desc   Deletes the post
//@routes DELETE /api/post/delete/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);
  if (deletedPost) {
    const deletedComments = await Comment.deleteMany({ id });
    res.status(200).json({
      message: "Post deleted Successfully!",
      deletedPost,
      deletedComments,
      deletedLikes,
    });
  } else {
    res.status(400);
    throw new Error("Failed to delete Post");
  }
});

//@desc   Gets single post details
//@routes GET /api/post/:id
//@access private
const singlePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const postDetail = await Post.findById(id);
  if (postDetail) {
    res.status(200).json({ message: "Post found!", postDetail });
  } else {
    res.status(400);
    throw new Error("Failed to get Post");
  }
});

//@desc   Gets all the posts
//@routes GET /api/post/
//@access private
const getPosts = asyncHandler(async (req, res) => {
  const query = req.query;

  const searchFilter = {
    desc: { $regex: query.search, $options: "i" },
  };

  const allPosts = await Post.find(query.search ? searchFilter : null);
  if (allPosts) {
    res.status(200).json({ message: "all Post found!", allPosts });
  } else {
    res.status(400);
    throw new Error("Failed to fetch posts");
  }
});

//@desc   Gets single post details
//@routes GET /api/post/user/:userId
//@access private
const userPost = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const postDetail = await Post.find({ userId });
  if (postDetail) {
    res.status(200).json({ message: "User Post found!", postDetail });
  } else {
    res.status(400);
    throw new Error("Failed to get user's Post");
  }
});

const sharePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const shareLink = `${req.protocol}://${req.get("host")}/post/${id}`;
  if (shareLink) {
    res.status(200).json(shareLink);
  } else {
    res.status(400);
    throw new Error("Error while creating link");
  }
});

module.exports = {
  createPost,
  updatePost,
  deletePost,
  singlePost,
  getPosts,
  userPost,
  sharePost,
};
