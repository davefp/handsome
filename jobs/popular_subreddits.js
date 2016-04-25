var request = require("request")
const url = "https://www.reddit.com/subreddits/popular.json";

module.exports = function() {
  return new Promise(function(fulfill, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var json = JSON.parse(body);
        var subreddit_list = [];
        json['data']['children'].slice(0,19).forEach(function(item) {
          subreddit_list.push(item['data']['display_name']);
        });
        fulfill({top_subreddits: {list: subreddit_list}});
      } else {
        reject(error);
      }
    });
  });
};
