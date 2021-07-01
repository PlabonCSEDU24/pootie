const { Post } = require("../models/posts");

module.exports = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  try {
    if (postId) {
      const post = await Post.findById(postId);
      if (post.userId == userId) {
        if (req.body.comments) {
          return res
            .status(400)
            .send({
              msg: "Use /api/posts/:postId/comments/:commentId for updating comments",
            });
        } else {
          req.post = post;
          next();
        }
      } else return res.status(400).send("You can only edit your posts");
    } else {
      if (req.body.comments) {
        return res
          .status(400)
          .send({
            msg: "Use /api/posts/:postId/comments/:commentId for updating comments",
          });
      } else {
        next();
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send("Something went wrong with database!");
  }
};
