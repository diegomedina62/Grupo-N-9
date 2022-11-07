'use strict'

const { faker } = require('@faker-js/faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transactions = [
    ]
    for (let i = 10; i < 10; i++) {
      transactions.push({
        description: faker.animal.cat(),
        amount: faker.datatype.number(),
        date: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('Transactions', transactions, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {})
  }
}
