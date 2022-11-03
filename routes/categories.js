const {Router} = require('express')
const {createCategory} = require('../controllers/categories')

const router = Router()

router.post('/', createCategory)


module.exports = router