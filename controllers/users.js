var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//SIGN UP
router.post('/signup', function(req,res) {
  console.log(req.body);
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    zipcode: req.body.zipcode
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

//Add item to list
router.post('/', function(req, res){
  console.log(req.body);
  var user = req.session.passport.user;
  User.find({username: user}).exec()
  .then(function(user){
    console.log(user);
    user[0].itemsToFind.push({
      name: req.body.name,
      category: req.body.category
    })
    return user[0].save();
  })
  .then(function(user) {
    res.json({ user : user });
  })
  .catch(function(err) {
    console.log(err);
  })
})

//Delete item from Items to Find
router.delete('/:id', function(req, res) {
  console.log('params>', req.params.id);
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user){
    var item = user.itemsToFind.id(req.params.id);
    item.remove();
    return user.save();
  })
  .then(function(user){
    res.json({ user : user });
  })
  .catch(function(err){
    console.log(err);
  })
})

//Delete item from Items in Cart
router.delete('/delete/:id', function(req, res) {
  console.log('params>', req.params.id);
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user){
    var item = user.itemsInCart.id(req.params.id);
    item.remove();
    return user.save();
  })
  .then(function(user){
    res.json({ user : user });
  })
  .catch(function(err){
    console.log(err);
  })
})

//Move Item to Cart
router.put('/:id', function(req, res) {
  // console.log('body???', req.body);
  // console.log('params>', req.params.id);
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user) {
    var item = user.itemsToFind.id(req.params.id);
    for(var i = 0; i < user.itemsInCart.length; i++) {
      if(user.itemsInCart[i] === null) {
        user.itemsInCart.splice(i, 1);
      }
    }
    console.log(user.itemsInCart);
    user.itemsInCart.push(item);
    for(var i = 0; i < user.itemsToFind.length; i++) {
      if(user.itemsToFind[i].id === req.params.id) {
        user.itemsToFind.splice(i, 1);
      }
    }
    return user.save();
  })
  .then(function(user){
    console.log(user);
    res.json({ user : user });
  })
  .catch(function(err){
    console.log(err);
  })
})

//Edit user zipcode
router.put('/zip/:id', function(req, res) {
  console.log('body???', req.body);
  User.findOne({username: req.session.passport.user}).exec()
  .then(function(user){
    user.zipcode = req.body.zipcode;
    return user.save();
  })
  .then(function(user){
    console.log(user);
    res.json({ user : user });
  })
  .catch(function(err){
    console.log(err);
  })
})





module.exports = router;
