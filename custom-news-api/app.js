var express = require('express');
var passport = require('passport');
var session = require('express-session');
var db = require('./db');
var app = express();

var UserController = require('./controllers/user-controller');
var AuthController = require('./controllers/auth-controller');

app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/users', UserController);
app.use('/login', AuthController);

db.defaults({
    users: [],
    userSources: [],
    userArticles: []
}).write();

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let user = db.get('users').find({id: id}).value();
    if (user == null){
      return done(new Error("user DNE"), user);
    }
});

module.exports = app;
