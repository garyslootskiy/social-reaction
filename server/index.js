const express = require('express');
const path = require('path');
const app = express();
const middleware = require('./middleware.js')

const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('/api/newsitems', middleware.getNewsItems, (req, res) => {  
  res.status(200).send(res.locals.newsItems);
});

app.get('/', (req, res) => {
 res.status(200).sendFile(HTML_FILE);
});

app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error: ' + err,
    status: 400,
    message: { err: 'An error occurred' }, 
  }
  const errorObj = Object.assign(defaultErr,{message: {err: err}});
  console.log('error Object',errorObj.log);

  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
})


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});