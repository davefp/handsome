var express = require('express');
var app = express();
var redis = require('redis');
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
      res.send(reply);
    }
  })
  client.quit();
});

app.listen(3000, function () {
  console.log("Up and running on port 3000");
});

// Serve our bundle
app.use("/assets", express.static('build'));
