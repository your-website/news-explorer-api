const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Unauthorized = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFoundError');
const { NO_FOUND_USER, ERROR_EMAIL_NAME, NO_USER_ID } = require('../CONST/MESSAGE');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NO_FOUND_USER);
      } else {
        res.send({ data: user });
      }
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new Unauthorized(ERROR_EMAIL_NAME);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch(() => {
      next(new Unauthorized(ERROR_EMAIL_NAME));
    });
}

function createUser(req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NO_USER_ID);
      }
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch(next);
}

module.exports = {
  getUser, login, createUser,
};
