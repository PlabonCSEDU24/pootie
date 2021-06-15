const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authorize = require("../middlewares/authorize");
const postAuthorize = require("../middlewares/postAuthorize");
const commentAuthorize = require("../middlewares/commentAuthorize");
const { Post } = require("../models/posts");
const { Comment } = require("../models/comments");
const postImageRouter = require("./postImageRouter");

const resErrorMessage = "Something went wrong with database";

const addNewPost = async (req, res) => {
  const userId = req.user._id;
  try {
    const post = new Post({
      ...req.body,
      userId: userId,
    });
    const ret = await post.save();
    return res.status(201).send(ret);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const data = await Post.findByIdAndDelete(req.params.postId);
    if (data) res.send(data);
    else return res.status(400).send("This post doesn't exist!");
  } catch (error) {
    return res.status(400).send(resErrorMessage);
  }
};

const updatePost = async (req, res) => {
  try {
    const data = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    res.send(data);
  } catch (error) {
    return res.status(400).send(resErrorMessage);
  }
};

const getAllPosts = async (req, res) => {
  const data = await Post.find();
  res.send(data);
};

const getPostById = async (req, res) => {
  try {
    const data = await Post.findById(req.params.postId);
    res.send(data);
  } catch (error) {
    return res.status(400).send(resErrorMessage);
  }
};

const getUserSpecificPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Post.find({ userId: userId });
    res.send(data);
  } catch (error) {
    return res.status(400).send(resErrorMessage);
  }
};

const getAllCommentFromPost = async (req, res) => {
  try {
    const { comments } = await Post.findById(req.params.postId);
    const commentsWithDescription = [];
    for (commentId of comments) {
      const comment = await Comment.findById(commentId);
      commentsWithDescription.push(comment);
    }
    res.send(commentsWithDescription);
  } catch (error) {
    console.log(error);
    return res.status(400).send(resErrorMessage);
  }
};

const getCommentFromPost = async (req, res) => {
  try {
    const data = await Comment.findById(req.params.commentId);
    res.send(data);
  } catch (error) {
    console.error(error);
    return res.status(400).send(resErrorMessage);
  }
};

const addCommentToPost = async (req, res) => {
  try {
    const comment = new Comment({
      ...req.body,
      name: req.user.name,
      userId: req.user._id,
      postId: req.params.postId,
    });
    const savedComment = await comment.save();
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: savedComment._id },
    });
    return res.status(201).send(savedComment);
  } catch (error) {
    console.log(error);
    return res.status(400).send(resErrorMessage);
  }
};

const deleteCommentFromPost = async (req, res) => {
  try {
    const del = await Comment.findByIdAndDelete(req.params.commentId);
    const delFromPost = await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { comments: req.params.commentId },
    });
    res.send(del);
  } catch (error) {
    return res.status(400).send(resErrorMessage);
  }
};

const editCommentFromPost = async (req, res) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { ...req.body },
      { new: true }
    );
    res.send(updateComment);
  } catch (e) {
    return res.status(400).send(resErrorMessage);
  }
};

router.route("/").get(getAllPosts).post([authorize, postAuthorize], addNewPost);

router
  .route("/:postId")
  .get(authorize, getPostById)
  .put([authorize, postAuthorize], updatePost)
  .delete([authorize, postAuthorize], deletePost);

router.use("/:postId/photos", authorize, postAuthorize, postImageRouter);

router
  .route("/:postId/comments")
  .get(authorize, getAllCommentFromPost)
  .post(authorize, addCommentToPost);

router
  .route("/:postId/comments/:commentId")
  .get(authorize, getCommentFromPost)
  .put([authorize, commentAuthorize], editCommentFromPost)
  .delete([authorize, commentAuthorize], deleteCommentFromPost);

router.route("/user/:userId").get(authorize, getUserSpecificPosts);

module.exports = router;
