/* eslint-disable no-unused-vars */
const createHttpError = require('http-errors')
const { Transaction, User } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// post transactions and update transactions
module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const userFound = await User.findByPk(req.body.user)
      if (!userFound) {
        const httpError = createHttpError(
          400,
            `[Error creating Transactions] - [transaction - POST]: ${"Id of user doesn't exist"}`
        )
        return next(httpError)
      }

      const createUser = await Transaction.create(req.body)
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
  }),

  //   update transaction

  put: catchAsync(async (req, res, next) => {
    try {
      const { user, amount, category, date } = req.body
      const { id } = req.params
      const userFound = await Transaction.findByPk(id)

      if (!userFound) {
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

}
