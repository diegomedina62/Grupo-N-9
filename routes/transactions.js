const express = require('express');
const {
    getTransaction,
    getTransactionById,
    createTransaction,
    editTransaction,
    deleteTransaction,
} = require('../controllers/transactions');
const checkIdTransaction = require('../middlewares/checkidtransaction');

const router = express.Router();

router.get('/', getTransaction);
router.get('/:id', checkIdTransaction, getTransactionById);
router.post('/', createTransaction);
router.put('/:id', editTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
