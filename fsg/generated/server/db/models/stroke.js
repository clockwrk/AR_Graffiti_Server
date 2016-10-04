'use strict';

var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('text', {
  dots: {
    type: Sequelize.ARRAY(Sequelize.ARRAY)
  },
  color: {
    type: Sequelize.STRING
  },
  font: {
    type: Sequelize.STRING
  }
});
