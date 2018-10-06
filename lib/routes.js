
var user = require('./controllers/users.js')
var  security = require('./controllers/security');
const multer = require('multer');
var path = require('path');
	const dir = './app/uploads';
	
	
	let storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
		}
	});
	
	let upload = multer({storage: storage});
	
module.exports = function (app) {	

	app.post('/api/Registeruser',user.Registeruser);
	app.post('/api/Authuser',user.Authuser);
};