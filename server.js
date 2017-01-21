var koa = require('koa');
var responseTime = require('koa-response-time');
var ratelimit = require('koa-ratelimit');
var compress = require('koa-compress');
var bodyParser = require('koa-bodyparser');
var logger = require('koa-logger');
var router = require('koa-router')();
var config = require('./config');
var dotenv = require('dotenv');
var jwt = require('koa-jwt');


const User = require('./api/users/model');
var app = koa();

// Load environment variables
dotenv.config();

var env = process.env.NODE_ENV || 'development';

/**
 * Initialize an app with the given `opts`.
 *
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

function cors(options) {
   return function *(next) {
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    this.set('Access-Control-Allow-Headers', 'X-Requested-With');
    // this.set('Access-Control-Allow-Credentials', 'true');
    yield next;
  }
}

app.use(cors());
app.use(responseTime());
app.use(logger());
app.use(bodyParser());

app.use(require('./api/auth').routes());
app.use(require('./api/users').routes());

app.use(
  jwt({ secret: config.jwtSecret })
  .unless({ path: [/^\/users/] })
);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(function *(){
    this.body = this.request.body;
});

app.listen(3000)
