
var model = require('./controllers/users.js')

module.exports = function (app) {	

	app.post('/api/Registeruser',model.Registeruser);
	app.post('/api/Authuser',model.Authuser);
	app.post('/api/GetUserProfile',model.GetUserProfile);
	app.get('/api/GetUserDetails/:token',model.GetUserDetails);
};