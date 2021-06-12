const { Post } = require("../models/posts");
const { Comment } = require("../models/comments");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      res.status(410).send("This comment doesn't exist in database!");
    if (userId === comment.userId.toString()) next();
    else return res.status(401).send("Can not edit other people's comment!");
  } catch (error) {
    return res.status(400).send('Something went wrong with database');
  }
};
