const createHttpError = require('http-errors')
const bcryptjs = require('bcryptjs')

const { User } = require('../database/models')

const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const validationDb = require('../helpers/validationDb')

const getUser = catchAsync(async (req, res, next) => {
  try {
    console.log(req)
    const { page } = req.query

    if (page) {
      const parsePage = parseInt(page, 10)
      const limit = 10
      const offset = parsePage * limit

      const { count: totalItems, rows: Users } = await User.findAndCountAll({ limit, offset })

      const totalPages = Math.ceil(totalItems / limit)
      const nextPage = totalPages - parsePage > 1 ? `${process.env.URL_BASE}users?page=${parsePage + 1}` : ''
      const previousPage = parsePage > 0 ? `${process.env.URL_BASE}users?page=${parsePage - 1}` : ''

      const response = {
        totalItems,
        itemsPerPage: limit,
        currentPage: parsePage,
        totalPages,
        previousPage,
        nextPage,
        users: Users
      }

      endpointResponse({
        res,
        message: 'All users',
        body: response
      })
    } else {
      const response = await User.findAll()
      endpointResponse({
        res,
        message: 'All users',
        body: response
      })
    }
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
    const schema = {
      where: {
        id
      }
    }
    const response = await validationDb(schema, User, true)
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

    const response = await User.create(user)

    endpointResponse({
      res,
      message: 'User successfully created',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error creating user] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const putUsers = catchAsync(async (req, res, next) => {
  const { id } = req.params
  let schema
  const { ...data } = req.body

  try {
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
    user.set(data)
    await user.save()

    endpointResponse({
      res,
      message: 'User upgraded successfully',
      body: user
    })
  } catch (error) {
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
    const schema = { where: { id } }
    await validationDb(schema, User, true)
    await User.destroy({ where: { id } })
    endpointResponse({
      res,
      message: 'User deleted successfully'
      // body: response
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
