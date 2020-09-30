const path = require('path');
const fetch = require("node-fetch");


const newsApi = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=878d534fe8594e45b4d535b8cf6e5788';
const twitterApi = 'https://api.twitter.com/2/tweets/search/recent?query=';
const twitterFields = '&tweet.fields=created_at&expansions=author_id&user.fields=created_at';

const middleware = {};

const twitterInfo = {
  consumer_key: 'g01wvuqmmKc3ZierjaT6wVjw7',
  consumer_secret: '9RrBYTItjxwBlzu8VHJcu9EYdI3cwpSjpGWCC7us9Qt1NkKa6V',
  access_token: '724669214112534528-724669214112534528-tjMho0SV8QLbv7PrTolGqpsyfKhfQHr%2BIDAmsMEkPtlKJKmAJJ5cnnBM%3DQ27urmLBVExLVBrtKfwstJ9nec1bVAT3jvXfzlE001EZ1gWCQh',
  access_token_secret: 'uXF02NDvLqeob8MgGyMySpQYT4zRUUTsea0COC1nRlGdK',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAJKLIAEAAAAAOimC14Tqq%2FMETLnbR6VYRgJEYKM%3DU6zY8GnJuQmRtrpbLg0UMkhctMn8XSwasp1aIr4vhMd735yadl',
};

middleware.getTweetItems = (req, res, next) => {
  const twitQuery = req.params.id;
  fetch(twitterApi + twitQuery, {
    headers: { 'authorization': `Bearer ${twitterInfo.bearer_token}` }})
    .then(res => res.json())
    .then(data => {
      res.locals.tweetItems = data;
      next();
    })
    .catch(err => 
      next({
        log: 'middleware.getTweetItems error: ' + err,
        message: { err: 'middleware.getTweetItems error.  Check Server Log for details.' },
      })
      )
}

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