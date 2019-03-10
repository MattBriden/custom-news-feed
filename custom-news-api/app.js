var express = require('express');
var passport = require('passport');
var session = require('express-session');
var cors = require('cors')
var db = require('./db');
var newsapi = require('./news-api');
var app = express();

var UserController = require('./controllers/user-controller');
var AuthController = require('./controllers/auth-controller');
var NewsController = require('./controllers/news-controller');

app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use('/users', UserController);
app.use('/login', AuthController);
app.use('/news', NewsController);

db.defaults({
    users: [],
    sources: [],
    userArticles: []
}).write();

// passport serializtion
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let user = db.get('users').find({id: id}).value();
    if (user == null){
      return done(new Error("user DNE"), user);
    }
});

newsapi.setSources();

module.exports = app;
