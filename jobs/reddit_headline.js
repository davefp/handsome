var request = require("request")
const url = "https://www.reddit.com/r/todayilearned.json?limit=5";

exports.interval = 5000;
exports.promise = function(fulfill, reject) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      for (var i = 0; i < json["data"]["children"].length; i++) {
        var child = json["data"]["children"][i];
        if(child["data"]["stickied"]) {
          continue;
        }
        fulfill({
          reddit_headline: {text: child["data"]["title"]},
          reddit_score: {number: child["data"]["score"]}
        });
        break;
      }
    } else {
      reject(error);
    }
  });
};
