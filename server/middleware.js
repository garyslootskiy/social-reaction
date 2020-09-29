const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

const newsApi = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=878d534fe8594e45b4d535b8cf6e5788';

const middleware = {};

middleware.getNewsItems = (req, res, next) => {
  fetch(newsApi)
  .then(res => res.json())
  .then(data => {
    res.locals.newsItems = data.articles;
    next();
  })
  .catch(err => 
    next({
      log: 'middleware.getNewsItems error: ' + err,
      message: { err: 'middleware.getNewsItems error.  Check Server Log for details.' },
    })
    )
}

module.exports = middleware;