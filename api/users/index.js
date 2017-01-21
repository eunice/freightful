const bcrypt = require('bcrypt');
const router = require('koa-router')();
const User = require('./model');

router.get('/users', function *(next) {
  var users = yield User.collection().fetch();
  this.body = yield { users: users };
});

router.post('/users', function *(next) {
  var body = this.request.body;
  var salt = bcrypt.genSaltSync(10);
  var email = body.email;
  var password = body.password;
  if (password == body.password_confirmation) {
    var passwordHash = bcrypt.hashSync(password, salt);
  } else {
    this.throw(401)
  }

  var user = User
    .forge({
      email: email,
      password_hash: passwordHash
    })
    .save()

  if (yield user) {
    this.body = user;
  } else {
    this.throw(422);
  }

});

module.exports = router;
