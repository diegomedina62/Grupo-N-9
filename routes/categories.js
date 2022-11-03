const {Router} = require('express')
const {createCategory, getCategory} = require('../controllers/categories')
const checkIdCategory = require('../middlewares/checkIdCategory')

const router = Router()

router.post('/', createCategory)
router.get('/:id', checkIdCategory, getCategory )


module.exports = router