const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const maxAge = 4 * 60 * 60 * 1000;

const createToken = (uid) => {
  return jwt.sign({ uid }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

exports.signup = (req, res) => {
  const { pseudo, nom, prenom, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new UserModel({ ...req.body, password: hash });

      user
        .save()
        .then(() => {
          res
            .status(201)
            .json({ message: "Inscription effectuée avec succès !" });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "Désolé aucun utilisateur ne correspond à cet email !",
        });
      }

      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(400).json({
              error: "Désolé veuillez reverifier votre mot de passe !",
            });
          }

          const token = createToken(user._id);
          res.cookie("jwt", token, { httOnly: true, maxAge });

          UserModel.findByIdAndUpdate(
            user._id,
            { isOnline: true },
            { new: true }
          )
            .select("-password")
            .then((user) => {
              res.send(user);
            })
            .catch((error) => {
              res.status(404).json({ error });
            });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.logout = (req, res) => {
  UserModel.findByIdAndUpdate(req.auth.userIdAuth, { isOnline: false })
    .then(() => {
      res.cookie("jwt", "", { maxAge: 1 });
      res.json({ message: "Déconnexion effectuée avec succès !" });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
