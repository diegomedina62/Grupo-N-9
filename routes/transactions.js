const express = require('express')
const {getTransaction} = require('../controllers/getTransactions')

const router = express.Router()

router.get('/', getTransaction)

module.exports = router