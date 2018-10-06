var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

function encrypt(text) {
	try
	{
		if (text === null || typeof text === 'undefined') { return text; };
		var cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTED_KEY);
		var crypted = cipher.update(text,'utf8','hex');
		crypted += cipher.final('hex');
	}
	catch(err)
	{}
	return crypted;
} 

function decrypt(text) {
	try
	{

		if (text === null || typeof text === 'undefined') {return text;};
		var decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTED_KEY);
		var dec = decipher.update(text,'hex','utf8');
		dec += decipher.final('utf8');
	}	
	catch(err)
	{}	
	return dec;
}

var TaskDetails = new Schema(
{
	assignto:[{username:{ type: String, get: decrypt, set: encrypt},id:{type:String}}],
	assignby:{username:{ type: String, get: decrypt, set: encrypt},id:{type:String}},
	Task:[{name:{ type: String, get: decrypt, set: encrypt},Description:{ type: String, get: decrypt, set: encrypt},status:{ type: String, get: decrypt, set: encrypt},remark:{ type: String, get: decrypt, set: encrypt},comments:[{type: String, get: decrypt, set: encrypt}],assigndate:{type:Date , default:new Date()},estimatedtime:{type:Date},closetime:{type:Date}}],
});


TaskDetails.set('toJSON', { getters: true, setters: true ,virtuals: true});
TaskDetails.set('toObject', { getters: true, setters: true,virtuals: true });


mongoose.model('TaskDetails', TaskDetails);