const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  createComment,
  updateComment,
  deleteComment,
  getCommentOfPost,
} = require("../controllers/commentController");

router.post("/create", protect, createComment);
router.put("/update/:id", protect, updateComment);
router.delete("/delete/:id", protect, deleteComment);
router.get("/post/:postId", protect, getCommentOfPost);

module.exports = router;
