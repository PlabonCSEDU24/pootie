const express = require("express");
const router = express.Router();
const { Post } = require("../models/posts");
const { Category } = require("../models/categories");

const getAllCategories = async (req, res) => {
  const catNames = [];
  try {
    for (const catId of req.post.categories) {
      const cat = await Category.findById(catId);
      catNames.push(cat.name);
    }
    res.send(catNames);
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
};

const addNewCategory = async (req, res) => {
  try {
    let cat = await Category.findOne({ name: req.body.categoryName });
    if (!cat) {
      const newCat = new Category({ name: req.body.categoryName });
      await newCat.save();
      cat = newCat;
    }
    await Post.findByIdAndUpdate(req.post._id, {
      $push: { categories: cat._id },
    });
    res.send("category added!");
  } catch (err) {
    return res.status(400).send("something went wrong");
  }
};

const removeCategory = async (req, res) => {
  try {
    const cat = await Category.find({ name: req.params.categoryName });
    await Post.findByIdAndUpdate(req.post._id, {
      $pull: { categories: cat._id },
    });
    res.send("successfully removed this category");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};

router.route("/").get(getAllCategories).post(addNewCategory);
router.route("/:categoryName").delete(removeCategory);

module.exports = router;
