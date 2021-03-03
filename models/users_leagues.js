'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_leagues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_leagues.init({
    userId: DataTypes.INTEGER,
    leagueId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_leagues',
  });
  return users_leagues;
};