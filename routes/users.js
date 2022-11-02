const express = require('express')
const {
  get,
  postUsers
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)
router.post('/', postUsers)

module.exports = router
