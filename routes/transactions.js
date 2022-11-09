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
 *        -amount
 *        -user
 *        -category
 *        -date
 *      properties:
 *        description:
 *          type: string
 *          description: This is the description of the transaction
 *        amount:
 *          type: integer
 *          description: This is the amount of the transaction
 *        user:
 *          type: integer
 *          description: This is the user id of the transaction
 *        category:
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
*    security:
*     - bearerAuth: []
*/
router.get('/', authUser, getTransaction)


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
*          description: transaction not found
*        '500':
*          description: error of server
*    security:
*     - bearerAuth: []
*/
router.get('/:id', authUser, getTransactionById)

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
router.post('/', authUser, validationMiddleware(transactionSchemaPOST), createTransaction)

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
*            description: Update a new transaction 
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
router.put('/:id', authUser, editTransaction)

 /**
 /
* @swagger
* /transactions/{id}:
*  delete:
*    summary:  Delete a transaction 
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
router.delete('/:id', authUser, deleteTransaction)

module.exports = router
