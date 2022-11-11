const createHttpError = require('http-errors')
const bcryptjs = require('bcryptjs')

const { User } = require('../database/models')

const deleteFile = require('../helpers/deleteFile')
const ownership = require('../helpers/ownership')
const validationDb = require('../helpers/validationDb')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { encode } = require('../helpers/jwtFuntions')

const getUser = catchAsync(async (req, res, next) => {
  const { page = 0 } = req.query
  try {
    const parsePage = parseInt(page, 10)
    const limit = 10
    const offset = parsePage * limit

    const { count: totalItems, rows: users } = await User.findAndCountAll({ limit, offset })

    const totalPages = Math.ceil(totalItems / limit)
    const nextPage =
        totalPages - parsePage > 1
          ? `${process.env.URL_BASE}users?page=${parsePage + 1}`
          : ''
    const previousPage =
        parsePage > 0
          ? `${process.env.URL_BASE}users?page=${parsePage - 1}`
          : ''

    const payload = {
      totalItems,
      itemsPerPage: limit,
      currentPage: parsePage,
      totalPages,
      previousPage,
      nextPage,
      users
    }

    // create token
    const response = await encode({ payload })

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
    await ownership(req.userAuth, id)

    const schema = { where: { id } }
    const users = await validationDb(schema, User, true)

    // create token
    const response = await encode({ users })

    endpointResponse({
      res,
      message: 'User Id succesfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving user] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

const postUsers = catchAsync(async (req, res, next) => {
  const { roleId = 2, ...user } = req.body

  try {
    // Verify that email does not exist in the database
    const schema = { where: { email: user.email } }
    await validationDb(schema, User, false)

    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(user.password, salt)
    user.roleId = roleId
    user.avatar = req.filePath

    const users = await User.create(user)

    // create token
    const response = await encode({ users })

    endpointResponse({
      res,
      message: 'User successfully created',
      body: response
    })
  } catch (error) {
    // Checking if there are files in the request
    if (req.filePath) {
      deleteFile(req.filePath)
    }

    const httpError = createHttpError(
      error.statusCode,
      `[Error creating user] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const putUsers = catchAsync(async (req, res, next) => {
  const { ...data } = req.body
  const { id } = req.params
  let schema

  try {
    await ownership(req.userAuth, id)

    // Verify that email does not exist in the database
    if (data.email) {
      schema = { where: { email: data.email } }
      await validationDb(schema, User, false)
    }

    // Encrypt password
    if (data.password) {
      const salt = bcryptjs.genSaltSync()
      data.password = bcryptjs.hashSync(data.password, salt)
    }

    // Validate and extract user to update
    schema = { where: { id } }
    const user = await validationDb(schema, User, true)

    if (req.filePath) {
      deleteFile(user.avatar)
      user.avatar = req.filePath
    }

    user.set(data)
    await user.save()

    // create token
    const response = await encode({ user })

    endpointResponse({
      res,
      message: 'User upgraded successfully',
      body: response
    })
  } catch (error) {
    // Checking if there are files in the request
    if (req.filePath) {
      deleteFile(req.filePath)
    }

    const httpError = createHttpError(
      error.statusCode,
      `[Error updating user] - [index - PUT]: ${error.message}`
    )
    next(httpError)
  }
})

const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params
  try {
    await ownership(req.userAuth, id)

    const schema = { where: { id } }
    const user = await validationDb(schema, User, true)

    user.destroy()

    deleteFile(user.avatar)

    // create token
    const response = await encode({ user })

    endpointResponse({
      res,
      message: 'User deleted successfully',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error deleted user] - [index - DELETE]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser
}
