const Upload = require('./upload/upload.server.controller')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const multer  = require('multer')
module.exports = function(app){
	// API Server Endpoints
	app.get('/', Upload.displayForm)
	app.post('/upload', multipartMiddleware, Upload.upload)
}

