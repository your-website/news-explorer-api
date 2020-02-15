const router = require('express').Router();
const middlewaresauth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('./auth');

router.use(auth);
router.use(middlewaresauth);
router.use('/', require('./users'));
router.use('/', require('./articles'));

router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
