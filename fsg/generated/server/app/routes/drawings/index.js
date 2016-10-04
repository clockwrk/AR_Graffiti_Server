'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var Location = require('../../db/models/location');

router.get('/:lat/:lon/:alt', function(req, res, next) {
  // var location = req.params.currentLocation; //ex, '40712843N   74005952W'

  //slice the last digits, so that we can retrieve multiple data
  Location.findAll({
    where: {
       latitude: {
         $between: [+req.params.lat - 2000, +req.params.lat + 2000]
       },
       longitude: {
         $beween: [+req.params.lon - 2000, +req.params.lon + 2000]
       },
       altitude: {
         $beween: [+req.params.alt - 2000, +req.params.alt + 2000]
       }
    }
  })
    .then(function(locations) {
      var gettingDrawings = locations.map(loc => loc.getDrawings());
      return Promise.all(gettingDrawings)
    })
    .then(function(drawings) {
      res.send(drawings);
    })
});


router.post('/:lat/:lon/:alt', function(req, res, next) {
  var drawing = req.body;

  Location.create({
    latitude: req.params.lat,
    longitude: req.params.lon,
    altitude: req.params.alt
  })
    .then(function(location) {
      return location.addDrawing(req.body)
    })
    .then(function(createdDrawing) {
      res.send(createdDrawing);
    })
})