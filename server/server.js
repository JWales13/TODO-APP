var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

var tasks = require('./routes/tasks');


app.use('/tasks', tasks);



app.listen(port, function(){
    console.log('listening on port', port);
  });