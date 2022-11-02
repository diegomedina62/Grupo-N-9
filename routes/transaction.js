const express = require('express')

const router = express.Router()

// controllers
const { post } = require('../controllers/transactions')

router.post('/', post)

module.exports = router
