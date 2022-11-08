const { Router } = require('express')

const {
  createCategory,
  getCategoryById,
  getCategories,
  editCategory
} = require('../controllers/categories')
const validationMiddleware = require('../middlewares/ValidationMiddleware')
const categoriesSchemaPOST = require('../schemas/categoriesSchema-POST')

const router = Router()

router.get('/', getCategories)
router.post('/', validationMiddleware(categoriesSchemaPOST), createCategory)
router.get('/:id', getCategoryById)
router.put('/:id', editCategory)

module.exports = router
