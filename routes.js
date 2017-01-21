const router = require('koa-router')();

router.get('/test', function *(next) {
  this.body = "Test test test";
});

module.exports = router;
