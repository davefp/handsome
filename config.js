var redis = require('redis');

var config = {
  redis_server_host: process.env.REDIS_SERVER_HOST || "127.0.0.1",
  redis_server_port: process.env.REDIS_SERVER_PORT || 6379,
  redis_server_requires_auth: false,
  redis_server_password: process.env.REDIS_SERVER_PASSWORD || "",
};

exports.getRedisClient = function() {
  if (config.redis_server_host && config.redis_server_port) {
    var options = {};

    if (config.redis_server_requires_auth) {
      if (config.redis_server_password) {
        options.password = config.redis_server_password;
      } else {
        throw "Server requires auth but no password was supplied";
      }
    }

    return redis.createClient(config.redis_server_port, config.redis_server_host, options);
  } else {
    return redis.createClient();
  }
};
