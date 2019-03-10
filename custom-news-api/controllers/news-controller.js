var express = require('express');
var db = require('../db');
var newsapi = require('../news-api');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
var authenticate = require('../authentication');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/sources', authenticate.isAuthenticated, function (req, res){
  // Grab 5 sources from the db
  let sources = db.get('sources').take(5).value();
  if(sources == null){
    return res.status(400).send({message: 'Sorry something went wrong'});
  }
  res.status(200).send(sources);
});

router.get('/articles/:id', authenticate.isAuthenticated, async function(req, res) {
  // Get articles from newsapi, need async await for the http call
  let articles = await newsapi.getArticles(req.params.id);
  if(articles == null){
    return res.status(400).send({message: 'Sorry something went wrong'});
  }
  res.status(200).send(articles);
});

router.get('/articles', authenticate.isAuthenticated, function(req, res) {
  // Get username off of already verified jwt
  let token = req.headers['authorization'];
  let decoded = jwt.decode(token);

  // Get user saved articles
  let userArticles = db.get('userArticles').filter({username: decoded.user}).value();
  if(userArticles == null){
    return res.status(400).send({message: 'Sorry something went wrong'});
  }
  res.status(200).send(userArticles);

});

router.post('/articles', authenticate.isAuthenticated, function(req, res) {
  // Ensure request has data
  if(req.body == null || req.body.article == null){
    return res.status(400).send({message: "Bad Request"});
  }

  // Get username off of already verified jwt
  let token = req.headers['authorization'];
  let decoded = jwt.verify(token, 'secret');

  // Ensure the user exists
  let user = db.get('users').find({username: decoded.user}).value();
  if (user == null){
    return res.status(404).send('User does not exist');
  }

  let existingArticle =  db.get('userArticles').find({username: decoded.user, article: req.body.article}).value();
  if (existingArticle != null){
    return res.status(200).send({message: 'Article already saved.'})
  }
  // Save article for user
  let userArticle = {
    username: decoded.user,
    article: req.body.article,
    url: req.body.url
  }

  db.get('userArticles').push(userArticle).write();
  res.status(201).send({message: 'Article saved sucessfully.'})
});

router.delete('/articles', authenticate.isAuthenticated, function(req, res){
  // Ensure request has data
  if(req.body == null || req.body.article == null){
    return res.status(400).send({message: "Bad Request"});
  }

  // Get username off of already verified jwt
  let token = req.headers['authorization'];
  let decoded = jwt.verify(token, 'secret');

  // Delete article by title and user
  db.get('userArticles').filter({username: decoded.user}).remove({article: req.body.article}).write();
  res.status(202).send({message: 'Successfully deleted user article'});
})

module.exports = router;
