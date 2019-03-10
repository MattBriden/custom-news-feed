var jwt = require('jsonwebtoken');

module.exports = {
  isAuthenticated: function(req, res, next){
    // JWT must be provided by the "authorization" header
    var token = req.headers['authorization'];
    // if token is present attempt to verify
    if (token) {

      // Verify token and reject if secrets don't match
      jwt.verify(token, 'secret', function(err, decoded) {
        if (err) {
          return res.status(401).send({ message: 'Invalid JWT' });
        } else {
          // Auth checks out, move along
          next();
        }
      });

    } else {
      // If no token was provided return 401
      return res.status(401).send({message: 'No JWT provided.'});
    }
  }
}
