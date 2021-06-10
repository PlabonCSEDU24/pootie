const { Schema, model } = require('mongoose');

const postSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  bookName: {
    type: String,
    required: true,
    maxlength: 255,
  },
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
  comments: [
    {
      commentatorId: { type: Schema.Types.ObjectId },
      commentatorName: { type: String },
      comment: { type: String },
      time: { type: Date, default: Date.now() },
    },
  ],
});

module.exports.Post = model('Post', postSchema);