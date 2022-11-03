const {Router} = require('express')
const {createCategory, getCategoryById} = require('../controllers/categories')
const checkIdCategory = require('../middlewares/checkIdCategory')

const router = Router()

router.post('/', createCategory)
router.get('/:id', checkIdCategory, getCategoryById )


module.exports = router