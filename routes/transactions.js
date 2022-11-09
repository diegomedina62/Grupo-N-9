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


 /**
 /
* @swagger
* /transaction/{id}:
*  get:
*    summary: Find transaction by ID
*    parameters:
*       - name: id
*         in: path
*         description: ID of transaction to return
*         required: true
*         schema:
*           type: integer
*           format: int64 
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/transactions'          
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/transactions'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: Pet not found
*        '500':
*          description: error of server
*/
router.get('/:id', getTransactionById)

 /**
 /
* @swagger
* /transaction:
*  post:
*    summary: Find transaction by ID
*    description: Add a new transaction
*    requestBody:
*            description: Create a new pet in the store
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/transactions'
*              application/xml:
*                schema:
*                  $ref: '#/components/schemas/transactions'
*              application/x-www-form-urlencoded:
*                schema:
*                  $ref: '#/components/schemas/transactions'
*            required: true
*    responses:
*        '200':
*          description: successfuly operation
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/transactions'          
*            application/xml:
*              schema:
*                $ref: '#/components/schemas/transactions'
*        '400':
*          description: Invalid ID supplied
*        '404':
*          description: transaction not found
*        '500':
*          description: error of server
*/
router.post('/', validationMiddleware(transactionSchemaPOST), createTransaction)
router.put('/:id', editTransaction)
router.delete('/:id', deleteTransaction)

module.exports = router
