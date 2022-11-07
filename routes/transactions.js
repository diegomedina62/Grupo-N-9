const express = require("express");
const {
  getTransaction,
  getTransactionById,
  createTransaction,
  editTransaction,
} = require("../controllers/transactions");
const checkIdTransaction = require("../middlewares/checkidtransaction");
const validationMiddleware = require("../middlewares/ValidationMiddleware");
const transactionSchemaPOST = require("../schemas/transactionSchema-POST");

const router = express.Router();

router.get("/", getTransaction);
router.get("/:id", checkIdTransaction, getTransactionById);
router.post(
  "/",
  validationMiddleware(transactionSchemaPOST),
  createTransaction
);
router.put("/:id", editTransaction);

module.exports = router;
