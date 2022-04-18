const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    nom: {
      type: String,
      require: true,
      trim: true,
    },
    prenom: {
      type: String,
      require: true,
      trim: true,
    },
    birthDay: {
      type: String,
      default: "JJ-MM-AAAA",
    },
    country: {
      type: String,
      default: "Non renseigné",
    },
    bio: {
      type: String,
      trim: true,
      default: "Aucune biographie definie pour le moment !",
      maxlength: 1024,
    },
    picture: {
      type: String,
      default: "http://localhost:3005/uploads/profil/random-user.png",
    },
    backgroundImg: {
      type: String,
      default: "http://localhost:3005/uploads/background/bg.jpg",
    },
    email: {
      type: String,
      require: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 1024,
    },
    likePosts: {
      type: [String],
    },
    likeComments: {
      type: [String],
    },
    friends: {
      type: [String],
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    notifsFriends: {
      type: [String],
    },
    sendInvitation: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
