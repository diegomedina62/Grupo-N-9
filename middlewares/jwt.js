const jwt = require('jsonwebtoken')
const { User } = require('../database/models')
const { ErrorObject } = require('../helpers/error')

const decode = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    const httpError = new ErrorObject("Token Doesn't Exist")
    next(httpError)
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    const userAuth = await User.findByPk(id)

    if (userAuth === null) {
      const httpError = new ErrorObject('Invalid Token', 400)
      next(httpError)
    }

    req.userAuth = userAuth
  } catch (error) {
    const httpError = new ErrorObject('Invalid Token', 400)
    next(httpError)
  }

  next()
}

module.exports = { decode }
