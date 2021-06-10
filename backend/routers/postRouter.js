const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authorize = require("../middlewares/authorize");
const postAuthorize = require("../middlewares/postAuthorize");
const { Post } = require("../models/posts");

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

router.route("/").get(getAllPosts).post(authorize, addNewPost);

router
  .route("/:postId")
  .get(authorize, getPostById)
  .put([authorize, postAuthorize], updatePost)
  .delete([authorize, postAuthorize], deletePost);

router.route("/user/:userId").get(authorize, getUserSpecificPosts);

module.exports = router;