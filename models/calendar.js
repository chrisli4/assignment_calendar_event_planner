'use strict';
module.exports = (sequelize, DataTypes) => {
  var Calendar = sequelize.define('Calendar', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Calendar.associate = function(models) {
    // associations can be defined here
  };
  return Calendar;
};