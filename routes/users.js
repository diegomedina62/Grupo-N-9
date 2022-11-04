
const express = require('express')

const {
  getUser,
  getUserId,
  postUsers
} = require('../controllers/users')

const checkEmail = require('../middlewares/checkEmail')
const checkId = require('../middlewares/checkId')

const router = express.Router()

router.get('/', getUser)
router.get('/:id', checkId, getUserId)

router.post('/', checkEmail, postUsers)

module.exports = router
