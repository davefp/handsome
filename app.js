var express = require('express');
var app = express();
const path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, function () {
  console.log("Up and running on port 3000");
});

// Serve our bundle
app.use("/assets", express.static('build'));
