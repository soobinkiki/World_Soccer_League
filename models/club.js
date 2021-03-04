'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.club.belongsToMany(models.user, { through: 'users_clubs'})

    }
  };
  club.init({
    clubname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'club',
  });
  return club;
};