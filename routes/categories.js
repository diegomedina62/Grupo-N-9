const { Router } = require('express')

const {
  createCategory,
  getCategoryById,
  getCategories,
  editCategory,
  deleteCategory
} = require('../controllers/categories')
const authUser = require('../middlewares/authUser')
const validationMiddleware = require('../middlewares/ValidationMiddleware')
const categoriesSchemaPOST = require('../schemas/categoriesSchema-POST')

const router = Router()

router.get('/', authUser, getCategories)
router.post('/', authUser, validationMiddleware(categoriesSchemaPOST), createCategory)
router.get('/:id', authUser, getCategoryById)
router.put('/:id', authUser, editCategory)
router.delete('/:id', authUser, deleteCategory)

module.exports = router
