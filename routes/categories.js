const {Router} = require('express')

const {createCategory, getCategoryById,getCategories} = require('../controllers/categories')
const checkIdCategory = require('../middlewares/checkIdCategory')

const router = Router()

router.get('/', getCategories);
router.post('/', createCategory)
router.get('/:id', checkIdCategory, getCategoryById )


module.exports = router
