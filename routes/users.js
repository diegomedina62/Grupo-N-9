
const express = require('express')

const postUsers = require('../controllers/postUsers')
const { getUser } = require('../controllers/users')

const checkEmail = require('../middlewares/checkEmail')

const router = express.Router()

router.get('/', getUser)
router.post('/', checkEmail, postUsers)

module.exports = router
