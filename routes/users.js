const express = require('express')

const {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser
} = require('../controllers/users')

const checkEmailUsers = require('../middlewares/checkEmailUsers')
const checkIdUsers = require('../middlewares/checkIdUsers')

const router = express.Router()

router.get('/', getUser)
router.get('/:id', checkIdUsers, getUserId)

router.post('/', checkEmailUsers, postUsers)
router.put('/:id', checkIdUsers, putUsers)
router.delete('/:id', checkIdUsers, deleteUser)

module.exports = router
