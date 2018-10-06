var express = require('express');
var bodypareser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var path = require('path');

var app = express();

app.use(bodypareser.urlencoded({limit:'5mb',extended:true}));
app.use(bodypareser.json({limit:'5mb'}));

app.use(express.static(path.join(__dirname,'www')));

var corsOptions = {
  origin: 'http://localhost:4300',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

require('./lib/routes')(app);

var server = app.listen(8090,function(){
	console.log('server start on '+server.address().port);
})

module.exports = server