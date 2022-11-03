const express = require('express')
const { getTransaction, getTransactionById } = require('../controllers/transactions')
const checkIdTransaction = require('../middlewares/checkidtransaction')

const router = express.Router()

router.get('/', getTransaction)
router.get('/:id', checkIdTransaction, getTransactionById)

module.exports = router
