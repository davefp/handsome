var redis = require('redis');

exports.config = {
  redis_server_url: "127.0.0.1",
  redis_server_port: 6379,
  redis_server_requires_auth: false,
  redis_server_password: ""
};

exports.getRedisClient = function() {
  if (this.config.redis_server_url && this.config.redis_server_port) {
    var options = {};

    if (this.config.redis_server_requires_auth && this.config.redis_server_password) {
      options.password = this.config.redis_server_password;
    }

    return redis.createClient(this.config.redis_server_port, this.config.redis_server_url, options);
  } else {
    return redis.createClient();
  }
};
