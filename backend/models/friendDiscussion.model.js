const mongoose = require("mongoose");

const friendDiscussionSchema = new mongoose.Schema(
  {
    friendOneId: { type: String, required: true },
    friendTwoId: { type: String, required: true },
    timestamp: { type: Number, default: new Date().getTime() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("friendDiscussion", friendDiscussionSchema);
