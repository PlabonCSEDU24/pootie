const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  name: {
    type: String,
  }
});

module.exports.Category = model('Category', categorySchema);
