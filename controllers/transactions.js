const createHttpError = require('http-errors')

const { Transaction, User, Category } = require('../database/models')

const { endpointResponse } = require('../helpers/success')
const validationDb = require('../helpers/validationDb')
const { catchAsync } = require('../helpers/catchAsync')

const getTransaction = catchAsync(async (req, res, next) => {
  try {
    const response = await Transaction.findAll()
    endpointResponse({
      res,
      message: 'Transactions retrieved successfully',
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

const getTransactionById = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params
    const schema = {
      where: {
        id
      }
    }
    const response = await validationDb(schema, Transaction, true)

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

    const schema = {
      where: {
        id: user
      }
    }

    // found if the id user exist

    await validationDb(schema, User, true)

    schema.where.id = category

    // found if the id category exist

    await validationDb(schema, Category, true)

    const createUser = await Transaction.create({
      categoryId: category,
      userId: user,
      date,
      amount,
      description
    })

    endpointResponse({
      res,
      message: 'Transaction created successfully',
      body: createUser
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

    const schema = {
      where: {
        id
      }
    }

    await validationDb(schema, Transaction, true)

    // found if the id user exist

    schema.where.id = user

    await validationDb(schema, User, true)

    // found if the id category exist

    schema.where.id = category

    await validationDb(schema, Category, true)

    await Transaction.update(
      {
        categoryId: category,
        userId: user,
        date,
        amount,
        description
      },
      {
        where: {
          id
        }
      }
    )

    // eslint-disable-next-line no-undef
    endpointResponse({
      res,

      message: 'Transaction updated successfully'
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
    const schema = {
      where: {
        id
      }
    }

    const response = await validationDb(schema, Transaction, true)

    response.destroy()

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
