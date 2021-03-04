'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class league extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.league.belongsToMany(models.user, { through: 'users_leagues'})
    }
  };
  league.init({
    leaguename: DataTypes.STRING,
    leagueid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'league',
  });
  return league;
};