const { Schema, model } = require('mongoose');

const postSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    immutable: true,
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
  photos: [
    { type: String }
  ],
  comments: [
    { type: Schema.Types.ObjectId }
  ],
});

module.exports.Post = model('Post', postSchema);