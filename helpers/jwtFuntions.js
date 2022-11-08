const jwt = require('jsonwebtoken')
const { ErrorObject } = require('./error')

const encode = (payload) => {
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

const decoded = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    return payload
  } catch (error) {
    throw new ErrorObject('Invalid Token', 403)
  }
}

module.exports = { encode, decoded }
