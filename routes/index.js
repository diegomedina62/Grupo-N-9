const express = require('express')
const usersRouter = require('./users')
const transactionsRouter = require('./transaction')

const router = express.Router()

// example of a route with index controller get function
router.use('/users', usersRouter)

// router of transaction post and update
router.use('/transactions', transactionsRouter)

module.exports = router
