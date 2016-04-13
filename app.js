var express = require('express');
var app = express();
var redis = require('redis');
var moment = require('moment');

const path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/widgets/:widget.json', function(req, res) {
  var client = redis.createClient();
  var widget_data = client.get(req.params.widget, function(err, reply) {
    if(err) {
      res.json({'error': err});
    } else {
      var reply_json = JSON.parse(reply);
      var next_time = moment(reply_json.next_time);
      delete reply_json.next_time;
      var now = moment();
      if (now.isBefore(next_time)) {
        reply_json.updates_in_millis = moment.duration(now.diff(next_time)).asMilliseconds();
      } else {
        reply_json.updates_in_millis = 5000;
      }
      res.json(reply_json);
    }
  })
  client.quit();
});

app.listen(3000, function () {
  console.log("Up and running on port 3000");
});

// Serve our bundle
app.use("/assets", express.static('build'));

// load our jobs
require(__dirname + '/jobs.js');
