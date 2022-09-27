'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Personage, {
        type: DataTypes.UUID,
      })
    }
  }
  Character.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    physical_defence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    magical_defence: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accuracy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evasion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    critical_chance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hit_power: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Character',
  });
  return Character;
};