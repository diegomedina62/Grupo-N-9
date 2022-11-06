const createHttpError = require('http-errors')
const { Category } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const getCategories = catchAsync(async (req, res, next) => {
  try {
    const response = await Category.findAll()
    endpointResponse({
      res,
      message: 'Get categories',
      body: response
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving categories] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const createCategory = catchAsync(async (req, res, next) => {
  try {
    const { name, description } = req.body

    const data = {
      name,
      description
    }

    const category = await Category.create(data)
    await category.save()

    endpointResponse({
      res,
      message: 'Create a new category',
      body: category
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
        `[Error retrieving categories] - [index - POST]: ${error.message}`
    )
    next(httpError)
  }
})

const getCategoryById = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params
    const category = await Category.findByPk(id)
    endpointResponse({
      res,
      message: 'obtain category data',
      body: category
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving categories] - [index - GET]: ${error.message}`
    )
    next(httpError)
  }
})

module.exports = { createCategory, getCategoryById, getCategories }
