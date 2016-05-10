var config = require('./config/config');
var nodemailer = require('nodemailer');
var generator = require("xoauth2").createXOAuth2Generator({
			        user: config.nodemailer.user,
			        clientId: config.nodemailer.clientId,
			        clientSecret: config.nodemailer.clientSecret,
				    refreshToken: config.nodemailer.refreshToken,
				    accessToken: config.nodemailer.accessToken
			      });

generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});
// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport({service: 'gmail',
  auth: {
    xoauth2: generator
  }
});
 
// setup e-mail data with unicode symbols 
var sendMail = function(data, res){
	var mailOptions = {
	    from: '"github.io 👥" <'+config.nodemailer.user+'>', // sender address 
	    to: ''+config.nodemailer.receiver+'', // list of receivers 
	    subject: 'Message from your github.io ✔', // Subject line 
	    html: "Hello,<br> You have received a mail from:<br>Name: "+data.Name +"<br>Email: "+ data.Email +"<br>Message: "+ data.Message+"<br>", // plaintext body 
	}
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    else{	
		    res.header("Access-Control-Allow-Origin", "*");
	        res.header("Access-Control-Allow-Headers", "X-Requested-With");
		    res.send('success');
		    console.log('Message sent: ' + info.response);
	    }
	});
};
 


module.exports = function(app, passport){
	// API Server Endpoints
	app.post('/send', function(req, res){
	  // send mail with defined transport object 
	  sendMail(req.body, res);
	})
}

