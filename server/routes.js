var nodemailer = require('nodemailer');
var generator = require("xoauth2").createXOAuth2Generator({
			        user: 'roy.dajshi@gmail.com',
			        clientId: '58755763990-2e72ujpe368s7id8svohb70dbo8puuqg.apps.googleusercontent.com',
			        clientSecret: '01sNNvu7wxzfZBOzhFMKeUYO',
				    refreshToken: '1/KEPPLoEtrGDZ7AA2ZlRsm7NTJIirHDOUYiU1yu652T190RDknAdJa_sgfheVM0XT',
				    accessToken: 'ya29.CjHdApVbTJbt5RX9u3_ZRY9psr0OsEuoIMHJWplz6uX9gS5wB6r1hi-5PJHAVrpFEh30'
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
	    from: '"github.io 👥" <barmeshwar.1432@gmail.com>', // sender address 
	    to: 'sonipandey.71@gmail.com', // list of receivers 
	    subject: 'Hello ✔', // Subject line 
	    html: "Hello,<br> You have received a mail from:<br>Name: "+data.Name +"<br>Email: "+ data.Email +"<br>Message: "+ data.Message+"<br>", // plaintext body 
	}
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    return res.send('success');
	    console.log('Message sent: ' + info.response);
	});
};
 


module.exports = function(app, passport){
	// API Server Endpoints
	app.post('/send', function(req, res){
	  // send mail with defined transport object 
	  sendMail(req.body, res);
	})
}

