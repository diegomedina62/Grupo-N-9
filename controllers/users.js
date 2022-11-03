const createHttpError = require('http-errors')
const bcryptjs = require('bcryptjs')

const { User } = require('../database/models')

const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const getUser = catchAsync(async (req, res, next) => {
  try {
    const response = await User.findAll()
    endpointResponse({
      res,
      message: 'All users',
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

const putUsers = catchAsync(async (req, res, next) => {
  try {
    endpointResponse({
      res,
      message: 'Desde postUsers',
      body: []
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving users] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = {
  getUser,
  getUserId,
  postUsers,
  putUsers
}
