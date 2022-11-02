const createHttpError = require('http-errors')
// const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
const postUsers = catchAsync(async (req, res, next) => {
  try {
    endpointResponse({
      res,
      message: 'Desde postUsers',
      body: {}
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving users] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})
module.exports = postUsers
