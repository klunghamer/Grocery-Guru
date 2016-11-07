var express        = require('express'),
var bodyParser     = require('body-parser'),
var mongoose       = require('mongoose'),
var logger         = require('morgan'),
var port           = 3000 || process.env.PORT,
var passport       = require('passport'),
var LocalStrategy  = require('passport-local').Strategy,
// var User           = require('./models/user'),
var app            = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));

app.listen(port, function() {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});
