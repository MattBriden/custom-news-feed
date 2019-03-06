var express = require('express');
var db = require('./db');
var app = express();

var UserController = require('./controllers/user-controller');
var AuthController = require('./controllers/auth-controller');
app.use('/users', UserController);
app.use('/login', AuthController);

db.defaults({
    users: [],
    userSources: [],
    userArticles: []
}).write();

module.exports = app;
