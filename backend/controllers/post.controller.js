const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.createPostNoImg = (req, res) => {
  const newPostNoImg = new PostModel({ ...req.body });

  newPostNoImg
    .save()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.createPostWihImg = (req, res) => {
  const filename = req.file.filename;

  const newPostWithImg = new PostModel({
    ...req.body,
    picture: `http://localhost:3005/uploads/post/${filename}`,
  });

  newPostWithImg
    .save()
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllPosts = (req, res) => {
  PostModel.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOnePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send("ID unknown : " + req.params.id);
  }

  PostModel.findById(req.params.id)
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send("ID unknown : " + req.params.id);
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { message: req.body.message },
    { new: true, upsert: true }
  )
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send("ID unknown : " + req.params.id);
  }

  PostModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ message: "La suppression a été effectuée avec succés !" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likers: req.body.userId } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  UserModel.findByIdAndUpdate(
    req.body.userId,
    { $addToSet: { likePosts: req.params.id } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {})
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.dislikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $pull: { likers: req.body.userId } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  UserModel.findByIdAndUpdate(
    req.body.userId,
    { $pull: { likePosts: req.params.id } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {})
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.commentPost = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.commenterId)
  ) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        comments: { ...req.body, timestamp: new Date().getTime() },
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likeCommentPost = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.userId) ||
    !ObjectID.isValid(req.body.commentId)
  ) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  PostModel.findById(req.params.id)
    .then((post) => {
      const theComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (theComment) {
        theComment.likers.push(req.body.userId);

        UserModel.findByIdAndUpdate(req.body.userId, {
          $addToSet: { likeComments: req.body.commentId },
        })
          .then(() => {})
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        return res.status(404).send("Comment not found");
      }

      post
        .save()
        .then(() => res.send(post))
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.dislikeCommentPost = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.userId) ||
    !ObjectID.isValid(req.body.commentId)
  ) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  PostModel.findById(req.params.id)
    .then((post) => {
      const theComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (theComment) {
        theComment.likers = theComment.likers.filter(
          (idUder) => idUder !== req.body.userId
        );

        UserModel.findByIdAndUpdate(req.body.userId, {
          $pull: { likeComments: req.body.commentId },
        })
          .then(() => {})
          .catch((error) => {
            res.status(500).json({ error });
          });
      } else {
        return res.status(404).send("Comment not found");
      }

      post
        .save()
        .then(() => res.send(post))
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.editCommentPost = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.commentId)
  ) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  PostModel.findById(req.params.id)
    .then((post) => {
      const theComment = post.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (theComment) {
        theComment.text = req.body.text;
      } else {
        return res.status(404).send("Comment not found");
      }

      post
        .save()
        .then(() => res.send(post))
        .catch((error) => {
          res.status(500).send(error);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.deleteCommentPost = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.commentId)
  ) {
    return res
      .status(404)
      .send("Désolé il y'a des identifiants non reconnus !");
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $pull: { comments: { _id: req.body.commentId } } },
    { new: true }
  )
    .then((post) => res.send(post))
    .catch((error) => {
      res.status(500).json({ error });
    });
};
