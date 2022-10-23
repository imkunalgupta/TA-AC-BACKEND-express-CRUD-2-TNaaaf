const express = require('express');
const router = express.Router();
const Book = require('../models/books');
const Author = require('../models/authors');
const Category = require('../models/category');

// get request on /books/new
router.get('/new', (req, res) => {
  console.log(req.body);
  res.render('bookForm');
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, books) => {
    if (err) return next(err);
    res.redirect('/books');
  });
});

router.get('/', (req, res) => {
  Book.find({}, (err, book) => {
    res.render('allbooks', { book: book });
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Book.findById(id)
    .populate('category')
    .populate('author')
    .exec((err, book) => {
      render('eachbook', { book: book });
    });
});
router.get('/:categoryname/category/', (req, res) => {
  let categoryname = req.params.categoryname;
  Category.find({ name: categoryname })
    .populate('books')
    .exec((err, categoryData) => {
      res.render('bookscategory', { category: categoryData });
    });
});

module.exports = router;
