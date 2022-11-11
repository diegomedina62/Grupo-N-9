const createHttpError = require('http-errors')

const { Transaction, User, Category } = require('../database/models')

const ownership = require('../helpers/ownership')
const validationDb = require('../helpers/validationDb')
const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { encode } = require('../helpers/jwtFuntions')
const pagination = require('../helpers/pagination')

const getTransaction = catchAsync(async (req, res, next) => {
  const { query, page = 0 } = req.query
  let totalItems, transactions

  const parsePage = parseInt(page, 10)
  const limit = 10
  const offset = parsePage * limit

  try {
    if (query) {
      await ownership(req.userAuth, query)
      const { count, rows } = await Transaction.findAndCountAll({
        where: { userId: query },
        limit,
        offset
      })
      totalItems = count
      transactions = rows
    } else {
      const { count, rows } = await Transaction.findAndCountAll({ limit, offset })
      totalItems = count
      transactions = rows
    }

    const pagingData = pagination(totalItems, limit, parsePage)

    // create token
    const payload = transactions
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'Transactions retrieved successfully',
      body: response,
      options: pagingData
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving transactions] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

const getTransactionById = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params
    const schema = { where: { id } }
    const transaction = await validationDb(schema, Transaction, true)

    await ownership(req.userAuth, transaction.userId)

    // create token
    const payload = transaction
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'Transaction retrieved successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving transactions] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

const createTransaction = catchAsync(async (req, res, next) => {
  try {
    const { date, amount, user, category, description } = req.body

    // found if the id user exist
    const schema = { where: { id: user } }
    await validationDb(schema, User, true)

    // found if the id category exist
    schema.where.id = category
    await validationDb(schema, Category, true)

    const createUser = await Transaction.create({
      categoryId: category,
      userId: user,
      date,
      amount,
      description
    })

    // create token
    const payload = createUser
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'Transaction created successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error creating Transactions] - [transaction - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const editTransaction = catchAsync(async (req, res, next) => {
  try {
    const { user, amount, category, date, description } = req.body

    const { id } = req.params

    // found if the id transaction exist
    const schema = { where: { id } }
    const transaction = await validationDb(schema, Transaction, true)

    await ownership(req.userAuth, transaction.userId)

    // found if the id user exist
    schema.where.id = user
    await validationDb(schema, User, true)

    // found if the id category exist
    schema.where.id = category
    await validationDb(schema, Category, true)

    transaction.set({
      categoryId: category,
      userId: user,
      date,
      amount,
      description
    })
    await transaction.save()

    // create token
    const payload = transaction
    const response = await encode({ payload })

    // eslint-disable-next-line no-undef
    endpointResponse({
      res,
      message: 'Transaction updated successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error updating Transactions] - [transaction - PUT]: ${error.message}`
    )
    next(httpError)
  }
})

const deleteTransaction = catchAsync(async (req, res, next) => {
  const { id } = req.params
  try {
    const schema = { where: { id } }
    const transaction = await validationDb(schema, Transaction, true)

    await ownership(req.userAuth, transaction.userId)

    transaction.destroy()

    // create token
    const payload = transaction
    const response = await encode({ payload })

    endpointResponse({
      res,
      message: 'Delete transaction succesfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error deleting Transaction] - [index - DELETE]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = {
  getTransaction,
  getTransactionById,
  createTransaction,
  editTransaction,
  deleteTransaction
}
