const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authorize = require("../middlewares/authorize");
const postAuthorize = require("../middlewares/postAuthorize");
const commentAuthorize = require("../middlewares/commentAuthorize");
const { Post } = require("../models/posts");
const ObjectId = require("mongoose").Types.ObjectId;

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
    return res.status(400).send(error);
  }
};

const updatePost = async (req, res) => {
  try {
    if (req.body.comments.length > 0) {
      return res
        .status(400)
        .send(
          "Use /api/posts/:postId/comments/:commentId for updating comments"
        );
    }
    const data = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    res.send(data);
  } catch (error) {
    return res.status(400).send(error);
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
    return res.status(400).send(error);
  }
};

const getUserSpecificPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Post.find({ userId: userId });
    res.send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllCommentFromPost = async (req, res) => {
  try {
    const { comments } = await Post.findById(req.params.postId);
    res.send(comments);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getCommentFromPost = async (req, res) => {
  try {
    const data = await Post.find(
      {
        $and: [
          { _id: ObjectId(req.params.postId) },
          { "comments._id": ObjectId(req.params.commentId) },
        ],
      },
      {
        comments: {
          $elemMatch: { _id: ObjectId(req.params.commentId) },
        },
        _id: 0,
      }
    );
    const [
      {
        ["comments"]: [ret],
      },
    ] = data;

    res.send(ret);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const addCommentToPost = async (req, res) => {
  const newComment = { ...req.body, commentatorId: req.user._id };
  try {
    const ret = await Post.findByIdAndUpdate(
      { _id: req.params.postId },
      { $push: { comments: newComment } },
      { new: true }
    );
    res.send(ret.comments[ret.comments.length - 1]);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const deleteCommentFromPost = async (req, res) => {
  console.log("ok");
  try {
    const ret = await Post.findByIdAndUpdate(
      { _id: req.params.postId },
      { $pull: { "comments._id": req.params.commentId } },
      { new: true }
    );
    res.send(ret);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const editCommentFromPost = async (req, res) => {
  res.send("aha");
};

router.route("/").get(getAllPosts).post(authorize, addNewPost);

router
  .route("/:postId")
  .get(authorize, getPostById)
  .put([authorize, postAuthorize], updatePost)
  .delete([authorize, postAuthorize], deletePost);

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
