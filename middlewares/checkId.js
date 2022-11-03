const createHttpError = require('http-errors')
const { User } = require('../database/models')

const checkId = async (req, res, next) => {
  const { id } = req.params
  const response = await User.findByPk(id)

  if (response === null) {
    const errorMessage = 'User ID not found'

    const httpError = createHttpError(
      400,
      `[Error register user] - [index - GET]: ${errorMessage}`
    )
    next(httpError)
  }
  next()
}

module.exports = checkId
