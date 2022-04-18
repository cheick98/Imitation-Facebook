const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const multerPost = require("../middlewares/multerPost.middleware");

const postController = require("../controllers/post.controller");

// get, post, put, delete post,  ...
router.post("/post-no-img", auth, postController.createPostNoImg);
router.post(
  "/post-with-img",
  multerPost,
  auth,
  postController.createPostWihImg
);
router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getOnePost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);
router.patch("/like-post/:id", auth, postController.likePost);
router.patch("/dislike-post/:id", auth, postController.dislikePost);

// comments
router.patch("/comment-post/:id", auth, postController.commentPost);
router.patch("/like-comment-post/:id", auth, postController.likeCommentPost);
router.patch(
  "/dislike-comment-post/:id",
  auth,
  postController.dislikeCommentPost
);
router.patch("/edit-comment-post/:id", auth, postController.editCommentPost);
router.patch(
  "/delete-comment-post/:id",
  auth,
  postController.deleteCommentPost
);

module.exports = router;
