const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', cards);
app.use('/', users);
app.use(function(req, res, next) {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});