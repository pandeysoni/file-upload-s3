// API Server Endpoints
module.exports = function(app){
  require("./user/user.server.routes")(app);
}
