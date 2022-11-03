const express = require('express');
const {
    getTransaction,
    getTransactionById,
    createTransaction,
    editTransaction,
} = require('../controllers/transactions');
const checkIdTransaction = require('../middlewares/checkidtransaction');

const router = express.Router();

router.get('/', getTransaction);
router.get('/:id', checkIdTransaction, getTransactionById);
router.post('/', createTransaction);
router.put('/:id', editTransaction);

module.exports = router;
