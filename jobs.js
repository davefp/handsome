var redis = require('redis');
var moment = require('moment');

var jobs = require('require-all')(__dirname + '/jobs');

function update_widget(name, data, next_time) {
  var client = redis.createClient();
  client.set(name, JSON.stringify({
    payload: data,
    next_time: next_time
  }), function(err, res) {
    if(err) {
      console.log(err);
    }
  });
  client.quit();
}

function start_recurring_job(job) {
  setInterval(function() {
    new Promise(job.promise).then(function(widget_data) {
      for (var widget in widget_data) {
        update_widget(widget, widget_data[widget], moment().add(5, 'seconds'));
      }
    });
  }, job.interval);
}

for (var job in jobs) {
  console.log("Starting job: " + job)
  start_recurring_job(jobs[job]);
}
