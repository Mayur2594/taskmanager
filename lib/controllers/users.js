var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var usersDetails = require('../models/usersDetails');
var users = mongoose.model('usersDetails');
var express = require('express');

var app = express();

var dblink ='mongodb://localhost:27017/sk';

var tokensecrate ='taskmanageryhdy27dhdv2672vd27vd!!&$#^&jb78n27d72_v62yv2y67vdhdb((dd89bduddidd_yudydyu2782bug@@';

app.set('superSecret', tokensecrate); // secret variable

var opts = {
	useNewUrlParser: true,
    //useMongoClient: true,
    autoReconnect: true,
	autoIndex: false, // Don't build indexes
    //reconnectTries: 100, // Never stop trying to reconnect /* Not used for replica set */
    //reconnectInterval: 500, // Reconnect every 500ms  /* Not used for replica set */
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    /*bufferMaxEntries: 0*/
	connectTimeoutMS: 30000,
	socketTimeoutMS: 30000 
  };
  
  
  exports.Registeruser = function (req, res) {
	  
	  console.log(req.body)
	  
	 mongoose.connect(dblink,opts).then(
	()=>{
				 var UsersDetails = new users(req.body);
				if(req.body._id)
				{
					
					    users.update({_id:req.body._id}, {
							$set: req.body
						}).exec(function (err, result) {
							if(err)
							{
								res.json({status:0,message:'Something went wrong, please try again'});
								 mongoose.disconnect();
							}
							else
							{
								res.json({status:1,message:'Profile updated successfully'});
								mongoose.disconnect();
							}
						});  
				}
				else
				{
						UsersDetails.save(function(err) {
							if(err)
							{
								res.json({status:0,message:'Something went wrong, please try again'});
								 mongoose.disconnect();
							}
							else
							{
								res.json({status:1,message:'Thank you! , Registration completed successfully'});
								mongoose.disconnect();
							}
						});  
					
				}
		},
		(err)=>{
			console.log("mongoose connection error",err);
		}); 
};
  
 
exports.Authuser = function (req, res) {
	mongoose.connect(dblink,opts).then(
	()=>{
		users.find({'username':req.body.username,'password':req.body.password},{'username':1}).lean().exec(function (err, result) {
			if(err)
				{
					res.json({status:0,message:'Something went wrong, please try again'});
					 mongoose.disconnect();
				}
				else
				{
					if(result.length > 0 && result.length == 1)
					{
								var payload = {
									userid: result[0]._id	
								}
						
								var token = jwt.sign(payload, app.get('superSecret'), {
									expiresIn: 28800 // expires in 24 hours = 86400
								});
								result[0].token = token;
								res.json({success:true,message:'logged in successfully.',data:result});
						
					}
					else
					{
						res.json({success:false,message:'User cridentials does not match.'});
					}
					
					mongoose.disconnect();
				}
		});
		},(err)=>{
			console.log("mongoose connection error",err);
		});
};  
  