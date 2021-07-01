const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const postAuthorize = require("../middlewares/postAuthorize");
const commentAuthorize = require("../middlewares/commentAuthorize");
const { Post } = require("../models/posts");
const postImageRouter = require("./postImageRouter");
const postCategoryRouter = require("./postCategoryRouter");
const postController = require("../controllers/posts/basic");
const commentController = require("../controllers/posts/comments");
const userSpecificController = require("../controllers/posts/user_specific");
const { postPhotosUpload } = require("../middlewares/fileSaver");
const photosController = require("../controllers/posts/photos");



router
  .route("/")
  .get(postController.handleGetPosts)
  .post([authorize, postPhotosUpload], postController.createNewPost);
// router.route("/categories/:categoryName").get(authorize, getAllPostsOfCategory);

router
  .route("/:postId")
  .get(authorize, postController.getPostById)
  .put([authorize, postAuthorize], postController.updatePostById)
  .delete([authorize, postAuthorize], postController.deletePostById);

// router.use("/:postId/photos", authorize, postAuthorize, postImageRouter);
// router.use("/:postId/categories", authorize, postAuthorize, postCategoryRouter);

router
  .route("/:postId/comments")
  .get(commentController.getAllCommentFromPost)
  .post(authorize, commentController.addCommentToPost);

router
  .route("/:postId/comments/:commentId")
  .put([authorize, commentAuthorize], commentController.editCommentFromPost)
  .delete(
    [authorize, commentAuthorize],
    commentController.deleteCommentFromPost
  );

router
  .route("/user/:userId")
  .get(authorize, userSpecificController.getUserSpecificPosts);

module.exports = router;
