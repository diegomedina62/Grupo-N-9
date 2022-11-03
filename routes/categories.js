const {Router} = require('express')
const {createCategory,getCategories} = require('../controllers/categories')

const router = Router()

router.get('/', getCategories);
router.post('/', createCategory)


module.exports = router
