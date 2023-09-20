const uploadStory = require("../middlewares/storiesMiddleware");
const asyncHandler = require("express-async-handler");
const Story = require("../models/storyModel");

const storyUpload = async (req, res) => {
  try {
    await uploadStory(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      filePath: `/stories/${req.file.filename}`,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

//@desc  Creates the new story
//@route  POST /story/create
//@access Private
const createStory = asyncHandler(async (req, res) => {
  const data = req.body;
  const newStory = await Story.create(data);
  if (newStory) {
    res.status(201).json({ message: "Story created successfully!", newStory });
  } else {
    res.status(400);
    throw new Error("Error occured while creation");
  }
});

//@desc  Gets all story
//@route  GET /story/all
//@access Private
const getStory = asyncHandler(async (req, res) => {
  const allStories = await Story.find({});
  if (allStories) {
    res.status(200).json(allStories);
  }
  res.status(400);
  throw new Error("Error occured while fetching stories");
});

//@desc  Gets the single story
//@route  GET /story/:userId
//@access Private
const singleStory = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const foundStory = await Story.findById(userId);
  if (foundStory) {
    res.status(200).json(foundStory);
  }
  res.status(400);
  throw new Error("Error occured while fetching story");
});

//@desc  Deletes the single story
//@route  DELETE /story/:id
//@access Private
const deleteStory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const foundStory = await Story.findByIdAndRemove(id);
  if (foundStory) {
    res.status(200).json(foundStory);
  }
  res.status(400);
  throw new Error("Error occured while deleting story");
});

module.exports = {
  storyUpload,
  createStory,
  getStory,
  singleStory,
  deleteStory,
};
