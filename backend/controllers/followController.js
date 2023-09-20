const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const followUser = asyncHandler(async (req, res) => {
  const { userIdToFollow } = req.body;
  const currentUserId = req.user._id;

  const following = await User.findByIdAndUpdate(currentUserId, {
    $push: { following: userIdToFollow },
  });
  const followers = await User.findByIdAndUpdate(userIdToFollow, {
    $push: { followers: currentUserId },
  });

  res
    .status(200)
    .json({ message: "Followed successfully", followers, following });
});

const unfollowUser = asyncHandler(async (req, res) => {
  const { userIdToUnfollow } = req.body;
  const currentUserId = req.user._id;

  const following = await User.findByIdAndUpdate(currentUserId, {
    $pull: { following: userIdToUnfollow },
  });
  const followers = await User.findByIdAndUpdate(userIdToUnfollow, {
    $pull: { followers: currentUserId },
  });

  res
    .status(200)
    .json({ message: "Unfollowed successfully", following, followers });
});

const getFollowers = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  const followers = user.followers;
  const following = user.following;
  res
    .status(200)
    .json({ message: "These are the followers", followers, following });
});

const getFollowersDetails = asyncHandler(async (req, res) => {
  const followersIds = req.body.followersIds;
  const followingIds = req.body.followingIds;

  console.log("Following IDs", followingIds);
  console.log("Followers IDs", followersIds);

  const followersData = await User.find({ _id: { $in: followersIds } }).select(
    "username picture"
  );
  const followingData = await User.find({ _id: { $in: followingIds } }).select(
    "username picture"
  );
  res.status(200).json({ followersData, followingData });
});

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowersDetails,
};
