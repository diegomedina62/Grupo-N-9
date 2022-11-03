const createHttpError = require('http-errors')
const { Transaction } = require('../database/models')

const checkIdTransaction = async (req, res, next) => {
  const { id } = req.params
  const response = await Transaction.findByPk(id)

  if (response === null) {
    const errorMessage = 'Transaction ID not found'

    const httpError = createHttpError(400, `[Error register transaction] - [index - GET]: ${errorMessage}`)
    next(httpError)
  }
  next()
}

module.exports = checkIdTransaction
