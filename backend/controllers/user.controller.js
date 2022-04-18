const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.getAllUsers = (req, res) => {
  UserModel.find()
    .select("-password")
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ error: "Désolé cet utilisateur n'existe pas !" });
  }

  UserModel.findById(req.params.id)
    .select("-password")
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.updateUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ error: "Désolé cet utilisateur n'existe pas !" });
  }

  UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .select("-password")
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ error: "Désolé cet utilisateur n'existe pas !" });
  }

  UserModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: "Votre compte a été supprimé avec succès !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.suggestionFriend = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ error: "Désolé cet identifiant n'existe pas !" });
  }

  try {
    let allUsersWithoutMe = (await UserModel.find()).filter(
      (user) => !user._id.equals(req.params.id)
    );

    let userAuth = await UserModel.findById(req.params.id);

    if (userAuth) {
      if (allUsersWithoutMe) {
        let suggestion = [];
        allUsersWithoutMe.forEach((user) => {
          if (!user.friends.includes(userAuth._id)) {
            suggestion.push(user._id);
          }
        });

        res.send(suggestion);
      }
    } else {
      throw "Désolé veuillez verifier votre identifiant !";
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.invitation = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.invitId)) {
    return res
      .status(404)
      .json({ error: "Désolé cette action ne peut pas être effectuée !" });
  }

  //   add to the notifFriends to the other
  UserModel.findByIdAndUpdate(
    req.body.invitId,
    {
      $addToSet: { notifsFriends: req.params.id },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {})
    .catch((error) => {
      res.status(400).json({ error });
    });

  //   add to the sendInvitation to the other
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { sendInvitation: req.body.invitId },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {
      res.send({ message: "Votre invitation a été envoyée avec succès !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.invitationAbort = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.invitId)) {
    return res
      .status(404)
      .json({ error: "Désolé cette action ne peut pas être effectuée !" });
  }

  // remove to the notifFriends to the other
  UserModel.findByIdAndUpdate(
    req.body.invitId,
    {
      $pull: { notifsFriends: req.params.id },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {})
    .catch((error) => {
      res.status(400).json({ error });
    });

  // remove to the sendInvitation to the other
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { sendInvitation: req.body.invitId },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {
      res.send({ message: "Vous avez annulé votre invation !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.acceptInvitation = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.invitId)) {
    return res
      .status(404)
      .json({ error: "Désolé cette action ne peut pas être effectuée !" });
  }

  //   add to my friends
  UserModel.findByIdAndUpdate(
    req.body.invitId,
    {
      $addToSet: { friends: req.params.id },
      $pull: { sendInvitation: req.params.id },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((user) => {
      res.send({
        message: "Vous avez accepté l'invitation de Mr/Mme/Mlle " + user.nom,
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });

  //   add to your friends
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { friends: req.body.invitId },
      $pull: { notifsFriends: req.body.invitId },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then((user) => {
      //   res.send({ message: "Votre invitation a été envoyée avec succès !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.refuseInvitation = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.invitId)) {
    return res
      .status(404)
      .json({ error: "Désolé cette action ne peut pas être effectuée !" });
  }

  //   remove to my notifFriends
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { notifsFriends: req.body.invitId },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {
      res.send({ message: "Vous avez refusé l'invitation !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });

  //   remove to your sendInvitation
  UserModel.findByIdAndUpdate(
    req.body.invitId,
    {
      $pull: { sendInvitation: req.params.id },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {})
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteFriend = (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.invitId)) {
    return res
      .status(404)
      .json({ error: "Désolé cette action ne peut pas être effectuée !" });
  }

  //   remove to my friends
  UserModel.findByIdAndUpdate(
    req.body.invitId,
    {
      $pull: { friends: req.params.id },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {})
    .catch((error) => {
      res.status(400).json({ error });
    });

  //   remove to your friends
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { friends: req.body.invitId },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(() => {
      res.send({
        message: "Vous avez l'avez retiré de la liste de vos amis !",
      });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
