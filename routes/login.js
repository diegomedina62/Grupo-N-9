const { Router } = require('express')
const postLogin = require('../controllers/login')

const router = Router()

router.post('/', postLogin)

module.exports = router
