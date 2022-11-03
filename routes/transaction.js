const express = require('express')

const router = express.Router()

// controllers
const { post, put } = require('../controllers/transactions')

router.post('/', post)
router.put('/:id', put)

module.exports = router
