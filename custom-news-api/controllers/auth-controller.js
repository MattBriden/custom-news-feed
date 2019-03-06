const bcrypt = require('bcrypt');
const saltRounds = 5;

var express = require('express');
var db = require('../db');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', function (req, res) {
  // Ensure proper fields are in request
  if(req.body == null || req.body.username == null || req.body.password == null){
    return res.status(400).send({message: "Bad Request"});
  }

  // Find user by username
  let user = db.get('users').find({username: req.body.username}).value();
  if (user == null){
    return res.status(400).send({message: "Invalid credentials"});
  }

  // Ensure password is correct
  bcrypt.compare(req.body.password, user.password, function(err, status) {
    if (err || !status) {
      return res.status(400).send({message: "Invalid credentials"});
    } else {
      return res.status(302).send({message: "Login successful!"});
    }
  });
});

module.exports = router;
