const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const middleware = require('./middleware.js');
const dbMiddleware = require('./dbMiddleware.js');

const port = 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(DIST_DIR));

app.post('/api/newsitems', middleware.getNewsItems, (req, res) => {  
  res.status(200).send(res.locals.newsItems);
});

app.get('/api/tweetitems/:id',
  middleware.getTweetItems,
  middleware.getTweetAuthors,
  middleware.convertTweetAuthors,
  (req, res) => {  
    res.status(200).send(res.locals.tweets);
});

app.post('/db/getuserinfo', dbMiddleware.getUserInfo, (req, res) => {  
  res.status(200).send(JSON.stringify(res.locals.userInfo));
});

app.post('/db/addquery', dbMiddleware.addQueryItem, (req, res) => {  
  res.status(200).send(JSON.stringify(res.locals.userInfo));
});

app.post('/signup',
  dbMiddleware.createUser,
  dbMiddleware.setSSIDCookie,
  (req, res) => { 
    console.log(`SIGNED UP WITH username: ${req.body.username}`);
    res.status(200).send();
  });

app.post('/signin',
  dbMiddleware.verifyUser,
  dbMiddleware.setSSIDCookie,
  (req, res) => { 
    console.log(`SIGNED IN WITH username: ${req.body.username}`);
    res.status(200).send();
  });

app.get('/logout',
  dbMiddleware.removeCookie,
  (req, res) => { 
    console.log(`successful signout`);
    res.status(200).send();
  });

app.get('/', (req, res) => {
 res.status(200).sendFile(HTML_FILE);
});

app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error: ' + JSON.stringify(err),
    status: 400,
    message: { err: 'An error occurred' }, 
  }
  const errorObj = Object.assign(defaultErr,{message: {err: JSON.stringify(err)}});
  console.log('error Object',errorObj.log);

  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
})


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});