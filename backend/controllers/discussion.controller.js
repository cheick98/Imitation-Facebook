const FriendDiscussionModel = require("../models/friendDiscussion.model");
const DiscussionModel = require("../models/discussion.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.createDiscussionWithFriend = (req, res) => {
  if (
    !ObjectID.isValid(req.body.friendDiscussionId) ||
    !ObjectID.isValid(req.body.senderId)
  ) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  let friendDiscId = req.body.friendDiscussionId;

  FriendDiscussionModel.findByIdAndUpdate(
    friendDiscId,
    {
      timestamp: new Date().getTime(),
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {
      let newDiscussion = new DiscussionModel({ ...req.body });
      newDiscussion
        .save()
        .then((discussion) => {
          res.send(discussion);
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getAllDiscussionsWithFriend = (req, res) => {
  if (!ObjectID.isValid(req.params.friendDiscId)) {
    return res.status(404).send("Désolé identifiant non reconnu !");
  }

  DiscussionModel.find({ friendDiscussionId: req.params.friendDiscId })
    // .sort({ createdAt: -1 })
    .then((discussions) => {
      res.send(discussions);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
