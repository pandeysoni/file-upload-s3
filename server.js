const express = require('express')
const Routes = require('./server/routes')
const config = require('./server/config/config')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/** load routes*/

require('./server/routes')(app);

var port = config.server.port;

app.listen(process.env.PORT || port);

console.log('App started on port ' + port);