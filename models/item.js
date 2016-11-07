var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: String,
  category: String
})

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
