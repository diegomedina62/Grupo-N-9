const express = require('express')
const {
  getTransaction,
  getTransactionById,
  createTransaction,
  editTransaction,
  deleteTransaction
} = require('../controllers/transactions')
const validationMiddleware = require('../middlewares/ValidationMiddleware')
const transactionSchemaPOST = require('../schemas/transactionSchema-POST')

const router = express.Router()

/**
 * /
 * @swagger
 * components:
 *  schemas:
 *    transactions:
 *      type: object
 *      requires:
 *        -description
 *        -amount
 *        -userId
 *        -categoryId
 *        -date
 *        -deletedAt
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the transaction
 *        description:
 *          type: string
 *          description: This is the description of the transaction
 *        amount:
 *          type: integer
 *          description: This is the amount of the transaction
 *        userId:
 *          type: integer
 *          description: This is the user id of the transaction
 *        categoryId:
 *          type: integer
 *          description: This is the category id of the transaction
 *        deletedAt:
 *          type: date
 *          description: This is the date of delete of the transaction
 *        date:
 *          type: date
 *          description: This is the date of the transaction
 *
 */



/**
 /
* @swagger
* /transaction:
*  get:
*    summary: returns the list of all transactions
*    responses:
*      200:
*         description: the list of transaction
*         content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/transactions'
*/
router.get('/', getTransaction)
router.get('/:id', getTransactionById)
router.post('/', validationMiddleware(transactionSchemaPOST), createTransaction)
router.put('/:id', editTransaction)
router.delete('/:id', deleteTransaction)

module.exports = router
