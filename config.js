var env = process.env.NODE_ENV || 'development';
var config;

if (env === "development") {
  config = {
    jwtSecret: 'thisisthesecretkeybutnotsosecret12345',
  }
}


module.exports = config;
