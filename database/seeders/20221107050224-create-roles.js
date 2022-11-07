'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = [
      { name: 'STANDARD', description: 'This is a standard rol', createdAt: new Date(), updatedAt: new Date() },
      { name: 'REGULAR', description: 'this is a regular rol', createdAt: new Date(), updatedAt: new Date() }
    ]

    await queryInterface.bulkInsert('Roles', roles, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
