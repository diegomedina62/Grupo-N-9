const jwt = require('jsonwebtoken')
const { token } = require('morgan')

const tokenCreator = (id) => {

    console.log(id)

    const token = jwt.sign({ id }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h'
    })

    return token
}

module.exports = tokenCreator
