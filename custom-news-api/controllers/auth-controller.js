const bcrypt = require('bcrypt');
const saltRounds = 5;

var express = require('express');
var passport = require('passport');
var db = require('../db');
var router = express.Router();
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function findUser(username, fn){
    let user = db.get('users').find({username: username}).value();
    return user == null ? fn(null, null) : fn(null, user);
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {

      findUser(username, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(password, user.password, function(err, status) {
          if (err || !status) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        });
      });
    });
  }
));


router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
     //res.redirect('/');
     res.status(200).send("Login complete");
});

module.exports = router;
