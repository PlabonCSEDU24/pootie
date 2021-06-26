const {Schema, model} = require('mongoose');

const commentSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  postId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String },
  comment: { type: String, required: true },
  time: { type: Date, default: Date.now() },
});

module.exports.Comment = model('Comment', commentSchema);