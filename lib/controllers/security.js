var jwt    = require('jsonwebtoken');
var express = require('express');
var cookieParser = require('cookie-parser')

var app = express();
var tokensecrate ='taskmanageryhdy27dhdv2672vd27vd!!&$#^&jb78n27d72 v62yv2y67vdhdb((dd89bduddidd yudydyu2782bug@@';

app.set('superSecret', tokensecrate); // secret variable

app.use(cookieParser())

module.exports = function(req, res, next) {
		
		var verificationObject = [{}];
		
		function getvaluesinObject(passedval)
		{
			var charindex = passedval.indexOf("=");
			var strindex = passedval.length;
			var field = passedval.substring(0,charindex).trim();
			var value = passedval.substring(charindex + 1,strindex);
			
			verificationObject[0][field] = value.trim();
			
			
		};
		
		
		var cookies = req.headers.cookie.split(';', 5);
		cookies.map(function(value){ getvaluesinObject(value)});
  // check header or url parameters or post parameters for token
    var token = verificationObject[0].token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {     
            if (err) {
                 req.decoded = { success: false, message: 'Failed to authenticate token.' }; 
            } else {
                // if everything is good, save to request for use in other routes
				decoded.success= true
				req.Loggedinuser = verificationObject[0];
                req.decoded = decoded;  
            }
        });

    } else {

        // if there is no token
        // return an error
         req.decoded ={ 
            success: false, 
            message: 'No token provided.'
        };
    }

};