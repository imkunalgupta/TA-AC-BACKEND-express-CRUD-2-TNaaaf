const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
});

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;
