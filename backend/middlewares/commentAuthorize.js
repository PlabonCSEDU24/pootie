const { Post } = require("../models/posts");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = async (req, res, next) => {
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
  const commentatorId = ret.commentatorId;
  const userId = req.user._id;
  try {
    if (userId === commentatorId) next();
    else return res.status(400).send("Can not edit other people's comment!")
  } catch (error) {
    return res.status(400).send(error);
  }
}