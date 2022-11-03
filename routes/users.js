
const express = require('express')

const {
  getUser,
  getUserId,
  postUsers,
  putUsers
} = require('../controllers/users')

const checkEmailUsers = require('../middlewares/checkEmailUsers')
const checkIdUsers = require('../middlewares/checkIdUsers')

const router = express.Router()

router.get('/', getUser)
router.get('/:id', checkIdUsers, getUserId)

router.post('/', checkEmailUsers, postUsers)
router.put('/:id', checkIdUsers, putUsers)

module.exports = router
