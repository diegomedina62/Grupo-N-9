const express = require('express')
const { getTransaction, getTransactionById } = require('../controllers/getTransactions')

const router = express.Router()

router.get('/', getTransaction)
router.get('/:id', getTransactionById)

module.exports = router
