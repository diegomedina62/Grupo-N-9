const { Router } = require('express');
const postLogin = require('../controllers/login');
const { encode } = require('../middlewares/jwt');

const router = Router()

router.post('/', encode, postLogin);

module.exports = router
