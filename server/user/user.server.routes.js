var User = require('./user.server.controller');

module.exports = function(app, passport){

    app.post('/user', User.create );
    app.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/#!/home',
    }), User.login);

    app.get('/logout', User.logout);
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/#!/home')
}