var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  pages: { type: Number, required: true },
  publication: String,
  category: [{ type: Schema.Types.ObjectID, ref: 'Category' }],
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
    },
  ],
});
var Book = mongoose.model('Book', bookSchema);
module.exports = Book;
