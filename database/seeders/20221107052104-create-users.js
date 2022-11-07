'use strict'
const fs = require('fs/promises')
const path = require('path')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = async () => {
      const pathJSON = path.join(__dirname, '../../users.json')
      const data = await fs.readFile(pathJSON, 'utf-8')
      return data
    }

    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {})
  }
}
