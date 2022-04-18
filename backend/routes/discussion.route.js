const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");

const discussionController = require("../controllers/discussion.controller");

// create discussion with a friend
router.post("/", auth, discussionController.createDiscussionWithFriend);

// get discussions with a friend
router.get("/:friendDiscId", discussionController.getAllDiscussionsWithFriend);

module.exports = router;
