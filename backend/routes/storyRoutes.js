const express = require("express");
const router = express.Router();
const {
  storyUpload,
  createStory,
  getStory,
  singleStory,
  deleteStory,
} = require("../controllers/storyController");

router.post("/", storyUpload);
router.post("/story/create", createStory);
router.get("/story/all", getStory);
router.get("/story/:userId", singleStory);
router.delete("/story/:id", deleteStory);

module.exports = router;
