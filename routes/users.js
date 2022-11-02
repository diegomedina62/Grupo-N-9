const express = require('express')
const postUsers = require('../controllers/postUsers')
const {
  get
} = require('../controllers/users')
const checkEmail = require('../middlewares/checkEmail')

const router = express.Router()

router.get('/', get)
router.post('/', checkEmail, postUsers)

module.exports = router
