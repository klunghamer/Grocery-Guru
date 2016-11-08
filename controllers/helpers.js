var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/stores/:lat/:long', function(req, res) {
  console.log('latitude>>', req.params.lat);
  console.log('key>', process.env.GOOGLE_KEY);
  var lat = req.params.lat;
  console.log('longitude>>', req.params.long);
  var long = req.params.long;
  console.log('hello');
  res.json({lat: lat, long: long});
})




module.exports = router;
