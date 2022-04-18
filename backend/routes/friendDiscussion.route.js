const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");

const friendDiscussionController = require("../controllers/friendDiscussion.controller");

// create discussion with a friend
router.post("/", auth, friendDiscussionController.createDiscussionWithFriend);
// get all user auth's friend discussion
router.get(
  "/:userAuthId",
  auth,
  friendDiscussionController.getFriendDiscussionUserAuth
);

// update timestamp


module.exports = router;
