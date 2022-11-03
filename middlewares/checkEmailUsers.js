const createHttpError = require('http-errors')
const { User } = require('../database/models')

const checkEmailUsers = async (req, res, next) => {
  const { email } = req.body
  const existingUser = await User.findOne({ where: { email } })

  if (existingUser !== null) {
    const errorMessage = 'The user is already registered'

    const httpError = createHttpError(
      400,
        `[Error register user] - [index - POST]: ${errorMessage}`
    )
    next(httpError)
  }
  next()
}

module.exports = checkEmailUsers
