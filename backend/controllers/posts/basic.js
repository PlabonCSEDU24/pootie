const { Post } = require("../../models/posts");

const defaultErrorMsg = (err) => {
  return {
    msg: err.message || "Something went wrong!",
  };
};
const inf = Number.MAX_SAFE_INTEGER;

// this will require authorize and filesave middleware first
const createNewPost = async (req, res) => {
  const body = { ...req.body };
  const userId = req.user._id;
  body.contactInfo = JSON.parse(body.contactInfo);
  body.categories = JSON.parse(body.categories);
  // console.log(body);
  // res.send(body);
  try {
    const post = new Post({
      ...body,
      userId: userId,
    });
    if (req.files?.length) {
      const photos = [];
      for (file of req.files) {
        photos.push({ fileName: file.filename, path: file.path, url: file.filename });
      }
      post.photos = photos;
    }

    const ret = await post.save();
    return res.status(201).send(ret);
  } catch (err) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

const handleGetPosts = async (req, res) => {
  try {
    const bookName = req.query.bookName;
    const categories = req.query.categories;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || inf;
    const queryType = req.query.queryType || "loose"; // ['loose', 'strict']
    let result = null;
    // query with only bookName
    if (bookName) {
      if (queryType === "loose") {
        result = await Post.find(
          { $text: { $search: bookName, $diacriticSensitive: true } },
          { score: { $meta: "textScore" } }
        )
          .sort({ score: { $meta: "textScore" } })
          .skip(skip)
          .limit(limit);
      } else {
        result = await Post.find({ bookName: bookName })
          .skip(skip)
          .limit(limit);
      }
      // query with only category
    } else if (categories) {
      if (queryType === "strict") {
        result = await Post.find({ categories: { $all: categories } })
          .skip(skip)
          .limit(limit);
      } else {
        result = await Post.find(
          {
            $text: { $search: categories.join(" "), $diacriticSensitive: true },
          },
          { score: { $meta: "textScore" } }
        )
          .sort({ score: { $meta: "textScore" } })
          .skip(skip)
          .limit(limit);
      }
    } else {
      result = await Post.find().skip(skip).limit(limit);
    }
    return res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(defaultErrorMsg(err));
  }
};

/**
 * req.params = { postId } needed
 */
const getPostById = async (req, res) => {
  try {
    const data = await Post.findById(req.params.postId);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

/**
 * req.params = { postId }
 * req.body = { ...updatedValue }
 */
const updatePostById = async (req, res) => {
  try {
    if (req.body.comments)
      throw new Error(
        "comment editing not allowed through this route, use posts/comments[/:commentId] for editing comments"
      );
    if (req.body.photos)
      throw new Error(
        "Photos editing is not allowed through this route use posts/photos"
      );

    const data = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

const deletePostById = async (req, res) => {
  try {
    const data = await Post.findByIdAndDelete(req.params.postId);
    if (data) res.send(data);
    else throw new Error("This post doesn't exists");
  } catch (error) {
    return res.status(400).send(defaultErrorMsg(err));
  }
};

module.exports = {
  createNewPost,
  handleGetPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
