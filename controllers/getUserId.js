const createHttpError = require('http-errors')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const getUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await User.findByPk(id)
    endpointResponse({
      res,
      message: 'User Id succesfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving users] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = getUserId
