const createHttpError = require('http-errors')
const { Transaction } = require('../database/models')
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

// example of a controller. First call the service, then build the controller method
module.exports = { getTransaction }
