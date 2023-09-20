const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowersDetails,
} = require("../controllers/followController");

router.post("/follow", protect, followUser);
router.post("/unfollow", protect, unfollowUser);
router.get("/followers/:userId", getFollowers);
router.post("/followers/detail", getFollowersDetails);

module.exports = router;
