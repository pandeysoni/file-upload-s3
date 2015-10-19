// API Server Endpoints
module.exports = function(app, passport){
  require("./user/user.server.routes")(app, passport);
}
