const express = require('express')
const postUsers = require('../controllers/postUsers')
const {
  get
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)
router.post('/', postUsers)

module.exports = router
