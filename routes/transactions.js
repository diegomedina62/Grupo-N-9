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
* /transactions:
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
* /transactions/{id}:
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
* /transactions:
*  post:
*    summary: create a new transaction 
*    description: Add a new transaction
*    requestBody:
*            description: Create a new transaction 
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
*          description: Invalid ID user or ID category
*        '404':
*          description: not Found ID user or ID category
*        '500':
*          description: error of server
*    security:
*     - bearerAuth: []
*/
router.post('/', validationMiddleware(transactionSchemaPOST), createTransaction)

 /**
 /
* @swagger
* /transactions/{id}:
*  put:
*    summary:  Update an existing transaction 
*    description: Update an existing transaction by Id
*    parameters:
*       - name: id
*         in: path
*         description: ID of transaction to return
*         required: true
*         schema:
*           type: integer
*           format: int64 
*    requestBody:
*            description: Create a new transaction 
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
*    security:
*     - bearerAuth: []
*/
router.put('/:id', editTransaction)

 /**
 /
* @swagger
* /transactions/{id}:
*  delete:
*    summary:  Deletes a transaction 
*    description: Delete a transaction
*    parameters:
*       - name: id
*         in: path
*         description: ID of transaction to delete
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
*          description: transaction not found
*        '500':
*          description: error of server
*    security:
*     - bearerAuth: []
*/
router.delete('/:id', deleteTransaction)

module.exports = router
