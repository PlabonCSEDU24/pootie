const { Schema, model } = require("mongoose");

const commentSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String },
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
  },
  price: {
    currency: { type: String },
    amount: { type: Number },
  },
  photos: [
    {
      type: String,
    },
  ],
  comments: [commentSchema],
});

module.exports.Post = model("Post", postSchema);
