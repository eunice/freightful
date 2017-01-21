const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../users/model');
const config = require('../../config');

router.post('/authenticate', function *(next) {
  var body = this.request.body;
  var email = body.email;
  var password = body.password;
  var user = yield User.where('email', email).fetch();
  if (user) {
    var u = user.toJSON();
    var isMatch = bcrypt.compareSync(password, u.password_hash);
    if (isMatch) {
      // Login logic returning a token or user in response
      var token = jwt.sign({iss: 'api.freightful.com', id: u.id, email: u.email, message: 'This is the coolest API on earth!'}, config.jwtSecret);
      this.body = { message: 'Welcome to the coolest API on earth!', token: token };
    } else {
      this.body = { message: 'Your shall not pass!'};
      this.throw(401);
    }
  }
});

module.exports = router;
