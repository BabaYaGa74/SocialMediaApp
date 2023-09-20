const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", StorySchema);
module.exports = Story;
