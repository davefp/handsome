var express = require('express');
var app = express();
var redis = require('redis');
var moment = require('moment');

const path = require('path');


app.set('port', (process.env.PORT || 3000));

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

app.listen(app.get('port'), function () {
  console.log("Up and running on port " + app.get('port'));
});

// Serve our bundle
app.use("/assets", express.static('build'));

// load our jobs
require(__dirname + '/jobs.js');
