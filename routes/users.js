
const express = require('express')

const getUser = require('../controllers/users')
const getUserId = require('../controllers/getUserId')
const postUsers = require('../controllers/postUsers')

const checkEmail = require('../middlewares/checkEmail')
const checkId = require('../middlewares/checkId')

const router = express.Router()

router.get('/', getUser)
router.get('/:id', checkId, getUserId)

router.post('/', checkEmail, postUsers)

module.exports = router
