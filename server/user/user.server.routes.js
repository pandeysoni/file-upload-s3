var User = require('./user.server.controller');

module.exports = function(app){

    app.post('/user', User.create );
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/#!/home')
}