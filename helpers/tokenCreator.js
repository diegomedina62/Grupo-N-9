const jwt = require('jsonwebtoken')
const { ErrorObject } = require('./error')

const tokenCreator = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (error, token) => {
      if (error) {
        reject(new ErrorObject('internal server error creating token', error.statusCode))
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = tokenCreator
