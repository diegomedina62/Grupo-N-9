const express = require('express')
const usersRouter = require('./users')
const transactionsRouter = require('./transactions')

const router = express.Router()

router.use('/users', usersRouter)
router.use('/transactions', transactionsRouter)

module.exports = router
