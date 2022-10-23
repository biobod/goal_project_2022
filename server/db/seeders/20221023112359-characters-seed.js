'use strict'
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Characters', [
            {
                id: uuidv4(),
                name: 'Defender',
                physical_defence: 30,
                magical_defence: 30,
                life_points: 120,
                accuracy: 80,
                evasion: 0,
                hit_power: 20,
                critical_chance: 5,
            },
            {
                id: uuidv4(),
                name: 'Archer',
                physical_defence: 10,
                magical_defence: 10,
                life_points: 90,
                accuracy: 70,
                evasion: 10,
                hit_power: 40,
                critical_chance: 5,
            },
            {
                id: uuidv4(),
                name: 'Mage',
                physical_defence: 10,
                magical_defence: 30,
                life_points: 90,
                accuracy: 90,
                evasion: 0,
                hit_power: 50,
                critical_chance: 0,
            },
            {
                id: uuidv4(),
                name: 'Warrior',
                physical_defence: 20,
                magical_defence: 10,
                life_points: 100,
                accuracy: 90,
                evasion: 10,
                hit_power: 30,
                critical_chance: 10,
            },
            {
                id: uuidv4(),
                name: 'Assassin',
                physical_defence: 0,
                magical_defence: 0,
                life_points: 90,
                accuracy: 90,
                evasion: 30,
                hit_power: 30,
                critical_chance: 20,
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Character', null, {})
    },
}
