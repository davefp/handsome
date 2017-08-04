var Cacheman = require('cacheman');

var storage_options = {
  engine: 'redis',
  port: process.env.REDIS_SERVER_PORT || 6379,
  host: process.env.REDIS_SERVER_HOST || "127.0.0.1",
  password: process.env.REDIS_SERVER_PASSWORD || undefined,
  prefix: process.env.REDIS_PREFIX || "handsome",
  ttl: -1
};

exports.getStorage = function() {
  return new Cacheman('handsome', storage_options)
};
