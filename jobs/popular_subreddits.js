var request = require("request")
const url = "https://www.reddit.com/subreddits/popular.json";

exports.interval = 5000;
exports.promise = function(fulfill, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      var subreddit_list = json['data']['children'].slice(0,19).map(function(item) {
        return item['data']['display_name'];
      });
      fulfill({top_subreddits: {list: subreddit_list}});
    } else {
      reject(error);
    }
  });
};
