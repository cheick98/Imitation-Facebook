const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    friendDiscussionId: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("discussion", discussionSchema);
