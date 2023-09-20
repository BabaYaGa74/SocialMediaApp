const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const { likePost, unlikePost } = require("../controllers/likeController");

router.post("/:postId/like", protect, likePost);
router.post("/:postId/unlike", protect, unlikePost);

module.exports = router;
