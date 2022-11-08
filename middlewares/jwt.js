const { token } = require("morgan");
const { putUsers } = require("../controllers/users");
const { ErrorObject } = require("../helpers/error");
const { User } = require('../database/models')
const bcrypt = require('bcryptjs')
const tokenCreator = require('../helpers/tokenCreator')
const jwt = require('jsonwebtoken')

const encode = async (req, res, next) => {


    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user === null) {
        throw new ErrorObject("Invalid User or Password")
    }

    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) {
        throw new ErrorObject("Invalid User or Password")
    }

    const token = tokenCreator(user.id)
    req.token = token

    next()
}

const decode = async (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (!token) {
        throw new ErrorObject("Token Doesn't Exist")
    }

    try {
        const decodificado = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.userid = decodificado.id
    } catch (error) {
        throw new ErrorObject("Invalid Token", 400)
    }

    next()
}

module.exports = { encode, decode }
