const validator = require('validator');
const mongoose = require('mongoose');
const { NOT_VALID_URL } = require('../CONST/MESSAGE');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(validate) {
        return validator.isURL(validate);
      },
      message: (props) => `${props.value} ${NOT_VALID_URL}`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(validate) {
        return validator.isURL(validate);
      },
      message: (props) => `${props.value} ${NOT_VALID_URL}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
