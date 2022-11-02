/* eslint-disable no-unused-vars */
const createHttpError = require('http-errors')
const Trnsaction = require('../database/models/transaction')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// post transactions and update transactions
module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      res.json({ message: 'funcionando' })
    } catch (error) {
      res.json({ message: 'no funciona' })
    }
  })
}
