const express = require('express')
const { getTransaction, getTransactionById, post } = require('../controllers/transactions')
const checkIdTransaction = require('../middlewares/checkidtransaction')

const router = express.Router()

router.get('/', getTransaction)
router.get('/:id', checkIdTransaction, getTransactionById)
router.post('/', post)

module.exports = router
