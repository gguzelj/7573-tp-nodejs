// server.js

// BASE SETUP
// =============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var subjectsRouter = require('./routes/subjects');

// Configuration of App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// REGISTER OUR ROUTES -------------------------------
app.use('/api/subjects', subjectsRouter);


// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;
app.listen(port);