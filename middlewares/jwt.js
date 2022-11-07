const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { User } = require('../database/models')
const tokenCreator = require('../helpers/tokenCreator')
const { ErrorObject } = require('../helpers/error')

const encode = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } })

    if (user === null) {
      const httpError = new ErrorObject('Invalid User or Password', 404)
      next(httpError)
    }

    const compare = bcryptjs.compareSync(password, user.password)

    if (!compare) {
      const httpError = new ErrorObject('Invalid User or Password', 404)
      next(httpError)
    }
    const payload = { id: user.id }
    const token = await tokenCreator(payload)
    req.token = token

    next()
  } catch (error) {
    const httpError = new ErrorObject(error.message, error.statusCode)
    next(httpError)
  }
}

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

module.exports = { encode, decode }
