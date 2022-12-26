'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Personage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { as: 'User', foreignKey: 'id' });
      this.belongsTo(models.Character, { as: 'Character', foreignKey: 'id' });
    }
  }
  Personage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    battles: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    characterId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Personage',
  });
  return Personage;
};
