require('dotenv').config();
require('./mongod');
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rootRouter = require('./routes/index');
const { limiter } = require('./rate limiter/rate-limiter');
const errorsCentr = require('./middlewares/errors');

const { PORT = 3000 } = process.env;

const app = express();
const allowedCors = [
    'https://your-news-explorer.tk',
    'http://your-news-explorer.tk',
    'localhost:3000',
    'http://localhost:8080',
    'localhost:8080'
];

app.use(function(req, res, next) {
    const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

    if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть среди разрешённых доменов
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

    next();
});
app.use(limiter);
app.use(helmet());
app.use(helmet.noCache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(rootRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorsCentr);

app.listen(PORT, () => {
});
