const express = require('express')

const {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser
} = require('../controllers/users')

const router = express.Router()

router.get('/', getUser)
router.get('/:id', getUserId)
router.post('/', postUsers)
router.put('/:id', putUsers)
router.delete('/:id', deleteUser)

module.exports = router
