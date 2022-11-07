'use strict'
const fs = require('fs/promises')
const path = require('path')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pathJSON = path.join(__dirname, '../../users.json')
    const data = await fs.readFile(pathJSON, 'utf-8')
    const users = JSON.parse(data)

    users.forEach(data => {
      data.createdAt = new Date()
      data.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
