'use strict';

var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('drawing', {
  stroke: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
  },
  angle: {
    type: Sequelize.INTEGER
  },
    directoryPath:{
        type: Sequelize.STRING
    }
});
