const createHttpError = require('http-errors')
const bcryptjs = require('bcryptjs')
const { User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
const postUsers = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync()
  const passwordBcrypt = bcryptjs.hashSync(password, salt)

  const user = {
    firstName,
    lastName,
    email,
    password: passwordBcrypt
  }

  try {
    const response = await User.create(user)

    endpointResponse({
      res,
      message: 'Desde postUsers',
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
module.exports = postUsers
