var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//SIGN UP
router.post('/signup', function(req,res) {
  // console.log(req.body);
  User.register(new User({
    username: req.body.username,
    email: req.body.email
  }),
  req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      res.json({user: user});
    }
  })
});

//LOG IN
router.post('/login', passport.authenticate('local'), function(req, res) {
  req.session.save(function (err) {
    if (err) return next(err);
    res.json({status: 200, message: 'ok', user: req.user});
  });
});

//LOG OUT
router.delete('/logout', function (req,res) {
  req.logout();
  res.json({status: 200});
});





module.exports = router;