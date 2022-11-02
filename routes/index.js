const express = require('express')
const usersRouter = require('./users')

const TransactionsRouter = require('./transactions')

const router = express.Router()

// example of a route with index controller get function
router.use('/users', usersRouter)

router.use('/transactions', transactionsRouter)

module.exports = router
