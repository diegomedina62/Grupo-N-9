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
      message: 'POST user success',
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
  const { id } = req.params

  const { ...data } = req.body

  if (data.password) {
    const salt = bcryptjs.genSaltSync()
    data.password = bcryptjs.hashSync(data.password, salt)
  }

  try {
    const user = await User.findByPk(id)
    user.set(data)
    await user.save()

    endpointResponse({
      res,
      message: 'PUT user success',
      body: user
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
