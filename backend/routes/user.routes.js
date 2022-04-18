const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const multerProfil = require("../middlewares/multerProfil.middleware");
const multerBgImg = require("../middlewares/multerBgImg");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadProfil = require("../controllers/uploadProfil.controller");

// auth
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", auth, authController.logout);

// get, post, put, delete user, invitation ...
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);
router.patch("/suggestion-friend/:id", auth, userController.suggestionFriend);
router.patch("/invitation/:id", auth, userController.invitation);
router.patch("/invitation-abort/:id", auth, userController.invitationAbort);
router.patch("/accept-invitation/:id", auth, userController.acceptInvitation);
router.patch("/refuse-invitation/:id", auth, userController.refuseInvitation);
router.patch("/delete-friend/:id", auth, userController.deleteFriend);

// change user picture
router.post("/upload", multerProfil, auth, uploadProfil.changeUserPicture);
// change background image
router.post("/upload-bg-img", multerBgImg, auth, uploadProfil.changeUserBgImg);

module.exports = router;
