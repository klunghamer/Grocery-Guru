var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var ItemSchema = require('./item').schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, validate: [validate.email, 'invalid email address']},
  password: String,
  zipcode: Number,
  itemsToFind: [ItemSchema],
  itemsInCart: [ItemSchema]
})

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

module.exports = User;
