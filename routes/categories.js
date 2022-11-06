const { Router } = require("express");
const {
  createCategory,
  getCategoryById,
} = require("../controllers/categories");
const checkIdCategory = require("../middlewares/checkIdCategory");
const validationMiddleware = require("../middlewares/ValidationMiddleware");
const categoriesSchemaPOST = require("../schemas/categoriesSchema-POST");

const router = Router();

router.post("/", validationMiddleware(categoriesSchemaPOST), createCategory);
router.get("/:id", checkIdCategory, getCategoryById);

module.exports = router;
