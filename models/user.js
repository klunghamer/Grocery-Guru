var mongoose = require('mongoose');
var validate = require('mongoose-validate');
var PlaceSchema = require('./place').schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, validate: [validate.email, 'invalid email address'] }
  password: String,
  itemsToFind: [PlaceSchema],
  itemsInCart: [PlaceSchema]
})

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

module.exports = User;
