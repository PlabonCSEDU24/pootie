const { Schema, model } = require("mongoose");

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
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
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
  photos: {
    type: Schema.Types.Array,
    validate: {
      validator: (val) => {
        console.log(val);
        return val.length <= 5;
      },
      message: "aaaaa",
    },
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports.Post = model("Post", postSchema);
