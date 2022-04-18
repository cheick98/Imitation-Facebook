const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
    },
    likers: {
      type: [String],
    },
    comments: {
      type: [
        {
          commenterId: { type: String, required: true },
          text: { type: String, required: true, trim: true },
          likers: { type: [String] },
          timestamp: { type: Number },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
