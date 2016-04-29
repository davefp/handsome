var request = require("request")
const unit = 'c';
const query = 'Ottawa';
const url = 'http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u=\'' + unit + '\' AND woeid in (select woeid from geo.places(1) where text="' + query + '")&format=json';

exports.interval =  1800000; // 30 minutes
exports.promise = function(fulfill, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var weather_data = JSON.parse(body).query.results.channel.item.condition;
      weather_data.unit = unit;
      fulfill({ottawa_weather: weather_data});
    } else {
      reject(error);
    }
  });
};
