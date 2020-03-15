Работа с Express.js. Создание собственного сервера.
-------------
#### Адрес:
##### Сайт: https://www.your-news-explorer.tk/;
##### API: https://www.api.your-news-explorer.tk/;

###### Для создания пользователя:
POST
/signup

body {
    name: "",
    email: "",
    password: "" (минимум 8 символов)
}


###### Чтобы войти под пользователем:
POST
/signin

body {
    email: "",
    password: ""
}
После успешного входа будет отправлен токен, его необходимо передавать в заголовке authorization c приставкой Bearer
Пример: 'Bearer токен'


###### Получить данные пользователя:
GET
/users/me


###### Получить сохраненные статьи пользователя:
GET
/articles


###### Удалить статью пользователя:
DELTE
/articles/:articleId


###### Сохранить статью:
POST
/articles
body {
    keyword: "",
    title: "",
    text: "",
    date: "",
    source: "",
    link: "",
    image: "",
}