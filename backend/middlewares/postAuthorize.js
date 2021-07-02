const { Post } = require("../models/posts");

module.exports = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  try {
    if (postId) {
      const post = await Post.findById(postId);
      if (post.userId == userId) {
        next();
      } else
        return res.status(400).send({ msg: "You can only edit your posts" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(400).send({ msg: "Something went wrong with database!" });
  }
};
