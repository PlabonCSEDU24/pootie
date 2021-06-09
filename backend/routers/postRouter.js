const express = require("express");
const router = express.Router();
const _ = require("lodash");
const authorize = require("../middlewares/authorize");
const { Post } = require('../models/posts');

const addNewPost = async (req, res) => {

}

const deletePost = async (req, res) => {

}

const updatePost = async (req, res) => {

}

const getAllPosts = async (req, res) => {

}

const getUserSpecificPosts = async (req, res) => {

}

router.route('/').
  get(getAllPosts).
  post(authorize, addNewPost).
  put(authorize, updatePost).
  delete(authorize, deletePost);

router.route('/:userId').get(authorize, getUserSpecificPosts);

module.exports = router;