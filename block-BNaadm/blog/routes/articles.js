var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Comment = require('../models/comment');

//create new article
router.get('/new', (req, res) => {
  res.render('articleForm.ejs');
});

//saving data

router.post('/', (req, res, next) => {
  Article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

//fetch the article

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articleList.ejs', { articles: articles });
  });
});

//fetch only one article
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  // Article.findById(id, (err, article) => {
  //   if (err) return next(err);
  //   res.render('articleDetails.ejs', { article: article });
  // });
  Article.findById(id)
    .populate('comments')
    .exec((err, article) => {
      if (err) return next(err);
      console.log(article);
      res.render('articleDetails.ejs', { article: article });
    });
});
//update article
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('editArticle.ejs', { article: article });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updatedarticle) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

// delete article
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    Comment.remove({ articleId: article.id }, (err) => {
      if (err) return next(err);
      res.redirect('/articles');
    });
  });
});

//increment likes
router.get('/:id/inc', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

//adding comments
router.post('/:articleId/comments', (req, res, next) => {
  var articleId = req.params.articleId;
  console.log(req.body);
  req.body.articleId = articleId;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: comment.id } },
      (err, article) => {
        if (err) return next(err);
        res.redirect('/articles/' + articleId);
      }
    );
  });
});
module.exports = router;
