const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');
const saltRounds = 5;

var express = require('express');
var db = require('../db');
var router = express.Router();
var bodyParser = require('body-parser');
var authenticate = require('../authentication');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', function (req, res) {
  // Ensure proper fields are in request
  if(req.body == null || req.body.username == null || req.body.password == null){
    return res.status(400).send({message: "Bad Request"});
  }

  // Do not allow multiple users with same username
  let user = db.get('users').find({username: req.body.username}).value();
  if (user != null){
    return res.status(409).send({message: "Username already exists"});
  }

  // Hash password
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) {
        return res.status(500).send({message: "Error hashing password"});
      }

      // Create user to be saved
      let user = {
        id: uuidv1(),
        username: req.body.username,
        password: hash
      };

      // Save user and return 201 created
      db.get('users').push(user).write();
      return res.status(201).send(user);
    });
  });
});

router.get('/:id', authenticate.isAuthenticated, function (req, res) {
  let user = db.get('users').find({id: req.params.id}).value();
  if (user == null) {
    return res.status(404).send({message: "User Not Found"});
  }
  res.status(200).send(user);
});

module.exports = router;
