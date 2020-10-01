const path = require('path');
const fetch = require("node-fetch");
const User = require('./db/schema');

const dbMiddleware = {};

dbMiddleware.createUser = (req, res, next) => {
  const { username, password } = req.body;

  User.create(({ username, password }), (err, user) => {
    if (err) return next({ err: 'was not able to create user' });

    res.locals.userID = user._id;
    return next();
  });
};


dbMiddleware.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne(({ username }), (err, user) => {
    if (err) return next( { log: `dbMiddleware.verifyUser ${err}`, message: 'Error' } );
    
    if (user) {
      user.comparePassword(password, (err, matches) => {
        if (err) return next( { err: `Brcypt.compare error: ${err}` } );

        if (matches) {
          res.locals.userID = user._id;
          return next();
        }
      })
    // if user doesn't exist, redirect to signup
  console.log('user does not exist');
    };
  });
}

dbMiddleware.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', encodeURIComponent(res.locals.userID));
  return next();
}

dbMiddleware.removeCookie = (req, res, next) => {
  res.clearCookie('ssid');
  return next();
}

dbMiddleware.getUserInfo = (req, res, next) => {
  // const _id = req.body.ssid.slice(1,-1);
  const _id = req.body.ssid;
  
  User.findOne(({ _id }), (err, user) => {
    if (err) return next( { log: `dbMiddleware.getUserInfo ${err}`, message: 'Error' } );
    if (user) {
      res.locals.userInfo = user;
      return next();
    };
    console.log("no user info");
    return next();
  });
}

dbMiddleware.addQueryItem = (req, res, next) => {
  // const _id = req.body.ssid.slice(1,-1);
  const {_id, topics} = req.body;
  
  User.findOneAndUpdate(({ _id }),{topics}, (err, user) => {
    if (err) return next( { log: `dbMiddleware.getUserInfo ${err}`, message: 'Error' } );
    if (user) {
      res.locals.userInfo = user;
      return next();
    };
    console.log("no user info");
    return next();
  });
}

module.exports = dbMiddleware;