const FriendDiscussionModel = require("../models/friendDiscussion.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.createDiscussionWithFriend = (req, res) => {
  if (
    !ObjectID.isValid(req.body.friendOneId) ||
    !ObjectID.isValid(req.body.friendTwoId)
  ) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  const newFriendDiscussion = new FriendDiscussionModel({ ...req.body });

  newFriendDiscussion
    .save()
    .then((friendDiscussion) => {
      res.send(friendDiscussion);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getFriendDiscussionUserAuth = (req, res) => {
  if (!ObjectID.isValid(req.params.userAuthId)) {
    return res.status(404).send("Désolé identifiant non reconnu !");
  }

  FriendDiscussionModel.find({
    $or: [
      { friendOneId: req.params.userAuthId },
      { friendTwoId: req.params.userAuthId },
    ],
  })
    .then((myFriendDiscussion) => {
      res.send(myFriendDiscussion);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
