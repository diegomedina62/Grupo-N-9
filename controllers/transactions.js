const createHttpError = require('http-errors')
const { Transaction, User, Category} = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync');

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
    // const { id } = req.params
    // const response = await Transaction.findByPk(id)
    const response = req.datoTransaccion
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
    const userFound = await User.findByPk(user);
    if (!userFound) {
      const httpError = createHttpError(
        400,
        `[Error creating Transactions] - [transaction - POST]: ${"Id of user doesn't exist"}`
      )
      return next(httpError)
    }

    const categoryFound = await Category.findByPk(category);

    if(!categoryFound){
      const httpError = createHttpError(
        400,
        `[Error creating Transactions] - [transaction - POST]: ${"Id of category doesn't exist"}`
      )
      return next(httpError)
    }

    const createUser = await Transaction.create({
      categoryId: category,
      userId: user,
      date,
      amount,
    })
    // eslint-disable-next-line no-undef
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

    const updateUser = await Transaction.update({
      userId: user,
      categoryId: category,
      amount,
      date
    }, {
      where: {
        id
      }
    })
    // eslint-disable-next-line no-undef
    endpointResponse({
      res,
      message: 'Transaction updated successfully',
      body: updateUser
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error updating Transactions] - [transaction - PUT]: ${error.message}`
    )
    next(httpError)
  }
})

// example of a controller. First call the service, then build the controller method
module.exports = { getTransaction, getTransactionById, createTransaction, editTransaction }
