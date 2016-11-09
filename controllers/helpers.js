var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/location/:zip', function(req, res) {
  // console.log(req.params.zip);
  // console.log('key>', process.env.GOOGLE_KEY);
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.zip}&key=${process.env.GOOGLE_KEY}`, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      var parse = JSON.parse(body);
      res.json(parse);
    }
  })
})

router.get('/stores/:lat/:long', function(req, res) {
  console.log(req.params.lat);
  console.log(req.params.long);
  request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.long}&radius=3000&type=grocery_or_supermarket&key=${process.env.GOOGLE_KEY}`, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      var parse = JSON.parse(body);
      res.json(parse);
    }
  })
})


module.exports = router;
