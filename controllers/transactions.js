const createHttpError = require('http-errors')
const { Transaction, User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
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
    const response = await Transaction.findByPk(id)
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
    const { date, amount, user, category } = req.body
    const userFound = await User.findByPk(user)
    if (!userFound) {
      const httpError = createHttpError(
        400,
                `[Error creating Transactions] - [transaction - POST]: ${"Id of user doesn't exist"}`
      )
      return next(httpError)
    }

    const createTransaction = await Transaction.create({
      date,
      amount,
      userId: user,
      categoryId: category
    })
    // eslint-disable-next-line no-undef
    endpointResponse({
      res,
      message: 'Transaction created successfully',
      body: createTransaction
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
            `[Error creating Transactions] - [transaction - POST]: ${error.message}`
    )
    next(httpError)
  }
})

//   update transaction

const editTransaction = catchAsync(async (req, res, next) => {
  try {
    const { user, amount, category, date } = req.body
    const { id } = req.params
    const transactionFound = await Transaction.findByPk(id)

    if (!transactionFound) {
      const httpError = createHttpError(
        400,
                `[Error Update Transactions] - [transaction - UPDATE]: ${"Transaction doesn't exist"}`
      )
      return next(httpError)
    }

    const updateTransaction = await Transaction.update(
      {
        userId: user,
        categoryId: category,
        amount,
        date
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
      message: 'Transaction updated successfully',
      body: updateTransaction
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
    const response = await Transaction.findByPk(id)

    if (!response) {
      const httpError = createHttpError(
        404,
                `[Error deleting Transactions] - [transaction - DELETE]: User with ID '${id}' doesn't exist or it's disabled`
      )
      res.status(404).json(httpError)
    } else {
      response.destroy()

      endpointResponse({
        res,
        message: 'Delete transaction succesfully',
        body: response
      })
    }
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
            `[Error deleting Transaction] - [index - DELETE]: ${error.message}`
    )
    next(httpError)
  }
})

// example of a controller. First call the service, then build the controller method
module.exports = { getTransaction, getTransactionById, createTransaction, editTransaction, deleteTransaction }
