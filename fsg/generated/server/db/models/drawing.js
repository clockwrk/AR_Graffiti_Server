'use strict';

var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('drawing', {
  strokes: {
    type: Sequelize.STRING
  },
  angle: {
    type: Sequelize.INTEGER
  }
});
