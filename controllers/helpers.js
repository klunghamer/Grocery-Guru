var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/stores/:lat/:long', function(req, res) {
  console.log('latitude>>', req.params.lat);
  var lat = req.params.lat;
  // console.log('key>', process.env.GOOGLE_KEY);
  // console.log('longitude>>', req.params.long);
  // request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.long}&radius=3000&type=grocery_or_supermarket&keyword=food&key=${process.env.GOOGLE_KEY}`, function (error, response, body) {
  //   if(!error && response.statusCode == 200) {
  //     var parse = JSON.parse(body);
  //     res.json(parse);
  //   }
  // })
  res.json({test: lat})
})




module.exports = router;
