'use strict'

const { faker } = require('@faker-js/faker')

function randomNumber (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transactions = []
    let category = 0
    for (let i = 0; i < 20; i++) {
      const money = randomNumber(-500, 500)
      if (money < 0) {
        category = 2
      } else {
        category = 1
      }

      transactions.push({
        description: faker.lorem.sentence(5),
        amount: money,
        date: faker.date.past(5),
        userId: randomNumber(1, 20),
        categoryId: category,
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
