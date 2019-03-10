const bcrypt = require('bcrypt');
const saltRounds = 5;

var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var db = require('../db');
var router = express.Router();
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function findUser(username, fn){
  // Find user by username and return callback
  let user = db.get('users').find({username: username}).value();
  return user == null ? fn(null, null) : fn(null, user);
}

// Passport strategy for username + password
passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {

      // Attempt to find user by username
      findUser(username, function(err, user) {
        if (err) {
          return done(err);
        }
        else if (!user) {
          return done(null, false);
        }

        // If user is found decrypt password
        bcrypt.compare(password, user.password, function(err, status) {
          if (err || !status) {
            return done(null, false);
          } else {
            // User is found and password mathces, user is good!
            return done(null, user);
          }
        });
      });
    });
  }
));


// User passport authentication above when performing login
router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  // Create and return a JWT with user info
  let token = jwt.sign({user: req.body.username}, 'secret');
  res.status(200).send({token: token});
});

module.exports = router;
