/* eslint-disable no-console, no-unused-vars */
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var moment = require('moment');

var config = require(__dirname + '/config.js');
var storage = config.getStorage();

const path = require('path');

app.engine('hbs', exphbs({defaultLayout: 'index', extname: '.hbs', layoutsDir: 'views/'}));
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.render('index', {name: 'index'});
});

app.get('/:dashboard', function(req, res) {
  res.render('index', {name: req.params.dashboard, layout: false});
});

app.get('/widgets/:widget.json', function(req, res) {
  storage.get(req.params.widget, function(err, reply) {
    if(err) {
      res.json({'error': err});
    } else if(reply === null) {
      console.log(req.params.widget, "no data")
    } else {
      var reply_json = JSON.parse(reply);
      console.log(req.params.widget, reply_json)
      try {
        var next_time = moment(reply_json.next_time);
        delete reply_json.next_time;
        var now = moment();
        if (now.isBefore(next_time)) {
          reply_json.updates_in_millis = moment.duration(next_time.diff(now)).asMilliseconds();
        } else {
          reply_json.updates_in_millis = 5000;
        }
        res.json(reply_json);
      } catch (e) {
        console.log(e)
      }
    }
  })
});

app.listen(app.get('port'), function () {
  console.log("Up and running on port " + app.get('port'));
});

// Serve our bundle
if(process.env.NODE_ENV === 'production') {
  // serve the contents of the build folder
  app.use("/assets", express.static('build'));
} else {
  // serve using webpack middleware
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
     publicPath: '/assets/',
     stats: {colors: true}
  }));
}

// load our jobs
require('./jobs.js');
