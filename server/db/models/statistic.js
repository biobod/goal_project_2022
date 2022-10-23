'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'User', foreignKey: 'id' });
    }
  }
  Statistic.init({
    current_points: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Statistic',
  });
  return Statistic;
};
