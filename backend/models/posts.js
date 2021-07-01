const { Schema, model } = require("mongoose");

const commentSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  comment: { type: String, required: true },
  time: { type: Date, default: Date.now() },
});

const postSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    immutable: true,
    ref: "User",
  },
  bookName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  author: {
    type: String,
    required: false,
    maxlength: 255,
  },
  categories: [{ type: String }],
  description: {
    type: String,
    maxlength: 1000,
  },
  contactInfo: {
    address: {
      type: String,
      maxlength: 1000,
    },
    phone: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 255 },
    geoInfo: { type: String },
  },
  price: {
    amount: { type: Number, max: 1000000000 },
  },
  photos: [
    {
      type: String,
    },
  ],
  comments: [commentSchema],
});
postSchema.index({
  categories: "text",
  bookName: "text",
  description: "text",
});

Post = model("Post", postSchema);
Post.createIndexes();
module.exports.Post = Post;
