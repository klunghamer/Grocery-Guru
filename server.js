var express        = require('express');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var logger         = require('morgan');
var port           = 3000 || process.env.PORT;
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var methodOverride = require('method-override');
// var User           = require('./models/user'),
var app            = express();
var User           = require('./models/user');
var Item           = require('./models/item')

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.static('public'));

app.get('/', function(res, req){
  res.render('index');
})

//Controllers
// var usersController = require('./controllers/users.js');

//Routes
// app.use('/users', usersController);

app.listen(port, function() {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});
