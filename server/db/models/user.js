'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Statistic, { foreignKey: 'userId' })
      this.hasMany(models.Personage, { foreignKey: 'userId' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
