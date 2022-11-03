const {Router} = require('express')
const {createCategory, getCategory} = require('../controllers/categories')

const router = Router()

router.post('/', createCategory)
router.get('/:id', getCategory )


module.exports = router