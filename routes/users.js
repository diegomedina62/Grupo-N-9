const express = require('express')
const validationMiddleware = require('../middlewares/ValidationMiddleware')
const userSchemaPOST = require('../schemas/userSchema-Post')
const userSchemaPUT = require('../schemas/userSchema-PUT')

const {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser
} = require('../controllers/users')
const authUser = require('../middlewares/authUser')

const router = express.Router()

router.get('/', authUser, getUser)
router.get('/:id', authUser, getUserId)
router.post('/', authUser, validationMiddleware(userSchemaPOST), postUsers)
router.put('/:id', authUser, validationMiddleware(userSchemaPUT), putUsers)
router.delete('/:id', authUser, deleteUser)

module.exports = router
