var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersDetails = new Schema(
{
	firstname:String,
	midname:String,
	lastname:String,
	mobile:Number,
	username:String,
	password:String
});


usersDetails.set('toJSON', { getters: true, setters: true ,virtuals: true});
usersDetails.set('toObject', { getters: true, setters: true,virtuals: true });


mongoose.model('usersDetails', usersDetails);