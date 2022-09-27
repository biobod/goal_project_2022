'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      physical_defence: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      magical_defence: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      life_points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accuracy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      evasion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      critical_chance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hit_power: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};