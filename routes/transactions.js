const express = require('express')
const {
  getTransaction,
  getTransactionById,
  createTransaction,
  editTransaction,
  deleteTransaction
} = require('../controllers/transactions')
const authUser = require('../middlewares/authUser')
const validationMiddleware = require('../middlewares/ValidationMiddleware')
const transactionSchemaPOST = require('../schemas/transactionSchema-POST')

const router = express.Router()

router.get('/', authUser, getTransaction)
router.get('/:id', authUser, getTransactionById)
router.post('/', authUser, validationMiddleware(transactionSchemaPOST), createTransaction)
router.put('/:id', authUser, editTransaction)
router.delete('/:id', authUser, deleteTransaction)

module.exports = router
