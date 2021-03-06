const Article = require('../models/article');
const NotImplemented = require('../errors/NotImplemented');
const NotAccess = require('../errors/NotAccess');
const { NO_CARD_ID, NOT_ACCESS } = require('../CONST/MESSAGE');

function getArticles(req, res, next) {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
}

function postArticles(req, res, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
}

function deleteArticle(req, res, next) {
  Article.findById(req.params.articleId)
    .then((articles) => {
      if (req.user._id === articles.owner.toString()) {
        Article.findByIdAndRemove(req.params.articleId)
          .then((article) => {
            res.send({ data: article });
          })
          .catch(next);
      } else next(new NotAccess(NOT_ACCESS));
    })
    .catch(() => {
      next(new NotImplemented(NO_CARD_ID));
    });
}

module.exports = {
  getArticles, postArticles, deleteArticle,
};
