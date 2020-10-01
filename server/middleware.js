const path = require('path');
const fetch = require("node-fetch");

const twitterApi = 'https://api.twitter.com/2/tweets/search/recent?query=';
const twitterInfo = {
  consumer_key: 'g01wvuqmmKc3ZierjaT6wVjw7',
  consumer_secret: '9RrBYTItjxwBlzu8VHJcu9EYdI3cwpSjpGWCC7us9Qt1NkKa6V',
  access_token: '724669214112534528-724669214112534528-tjMho0SV8QLbv7PrTolGqpsyfKhfQHr%2BIDAmsMEkPtlKJKmAJJ5cnnBM%3DQ27urmLBVExLVBrtKfwstJ9nec1bVAT3jvXfzlE001EZ1gWCQh',
  access_token_secret: 'uXF02NDvLqeob8MgGyMySpQYT4zRUUTsea0COC1nRlGdK',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAJKLIAEAAAAAg0psSyRKxV7Kf1cZ8n%2FsS%2BQXsDQ%3DWVgK1dygkBKFwOlEfbrO8zyfmN8W6aNzooFOLHz17kYdjzQRhh',
};

const middleware = {};


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

middleware.getTweetAuthors = (req, res, next) => {
  const tweetArray = res.locals.tweetItems.data;
  const authorArray = [];
  tweetArray.forEach(tweet => {
    authorArray.push(tweet.author_id)
  });
  const authorString = authorArray.join(',');
  const twitterUserApi = `https://api.twitter.com/2/users?ids=${authorString}&user.fields=profile_image_url`;
  fetch(twitterUserApi, {
    headers: { 'authorization': `Bearer ${twitterInfo.bearer_token}` }})
    .then(res => res.json())
    .then(data => {
      res.locals.authors = data;
       next();
    })
    .catch(err => 
      next({
        log: 'middleware.getTweetAuthors error: ' + err,
        message: { err: 'middleware.getTweetAuthors error.  Check Server Log for details.' },
      })
      )
}

middleware.convertTweetAuthors = (req, res, next) => {
  const authorStore = {};
  res.locals.authors.data.forEach(author => {
    authorStore[author.id] = {name: author.name, username: author.username, image: author.profile_image_url}
  })
  res.locals.tweets = {authors: authorStore, tweets: res.locals.tweetItems}
  next();
}

middleware.getNewsItems = (req, res, next) => {
  const newsApi = req.body.newsQuery;
  console.log(newsApi);
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