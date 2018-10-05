var express = require('express');
var bodypareser = require('body-parser');
var jwt = require('multer');

var app = express();

app.use(bodypareser.urlencoded({limit:'5mb',extended:true}));
app.use(bodypareser.json({limit:'5mb'}));

require('./lib/routes')(app);

var server = app.listen(8877,function(){
	console.log('server start on '+server.address().port);
})

module.exports = server