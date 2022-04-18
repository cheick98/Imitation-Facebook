const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require("../models/user.model");

exports.changeUserPicture = (req, res) => {
  const { userId } = req.body;

  if (!ObjectID.isValid(userId)) {
    return res
      .status(404)
      .json({ error: "Désolé cet utilisateur n'existe pas !" });
  }

  const filename = req.file.filename;
  console.log(req.file);

  UserModel.findByIdAndUpdate(
    userId,
    {
      picture: `http://localhost:3005/uploads/profil/${filename}`,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .select("-password")
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.changeUserBgImg = (req, res) => {
  const { userId } = req.body;

  if (!ObjectID.isValid(userId)) {
    return res
      .status(404)
      .json({ error: "Désolé cet utilisateur n'existe pas !" });
  }

  const filename = req.file.filename;

  UserModel.findByIdAndUpdate(
    userId,
    {
      backgroundImg: `http://localhost:3005/uploads/background/${filename}`,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .select("-password")
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};
