const express = require("express");
const router = express.Router();
const { Post } = require("../models/posts");

const getAllCategories = async (req, res) => {

};

const addNewCategory = async (req, res) => {

};

const removeCategory = async (req, res) => {
  
};

router.route("/").get(getAllCategories).post(addNewCategory);
router.route("/:categoryName").delete(removeCategory);

module.exports = router;
