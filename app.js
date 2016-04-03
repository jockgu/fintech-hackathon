// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');

// define controllers
var userController = require('./controllers/user');
var viceController = require('./controllers/vice');
var viceEventController = require('./controllers/viceevent');
var metricController = require('./controllers/metric');

// Configure system variables
var mongo = process.env.VCAP_SERVICES;
var port = process.env.PORT || 3030;

// Iniitalise database connection
var conn_str = "";
if (mongo) {
    var env = JSON.parse(mongo);
    if (env['mongodb-2.4']) {
        mongo = env['mongodb-2.4'][0]['credentials'];
        if (mongo.url) {
            conn_str = mongo.url;
        } else {
            console.log("No mongo found");
        }
    } else {
        conn_str = 'mongodb://localhost:27017';
    }
} else {
    conn_str = 'mongodb://localhost:27017';
}

// Connect to the database
mongoose.connect(conn_str);

// Create Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// Use express session support
app.use(session({
    secret: 'Keyboard Cat',
    saveUninitialized: true,
    resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /users
router.route('/api/users')
        .post(userController.postUsers)
        .get(userController.getUsers);

// Create endpoint handlers for /users/:user_id
router.route('/api/users/:user_id')
        .get(userController.getUser)
        .delete(userController.deleteUser);

// Create endpoint handlers for /vices/:user_id/vices
router.route('/api/users/:user_id/vices')
        .post(viceController.postVices);    
//        .get(viceController.getVices);

// Create endpoint handlers for /vices/:user_id/viceevents
router.route('/api/users/:user_id/viceevents')
        .post(viceEventController.postViceEvent)    
        .get(viceEventController.getViceEvents);

// create endpoint handlers for /users/:user_id/metrics
router.route('/api/users/:user_id/metrics')
        .post(metricController.postUserMetric)
        .get(metricController.getUserMetric);

router.route('/api/users/:user_id/metrics/score')
        .get(metricController.getUserMetricScore);

// Register all our routes
app.use(router);

//errors
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port);