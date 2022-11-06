const express = require("express");
const validationMiddleware = require("../middlewares/ValidationMiddleware");
const userSchemaPOST = require("../schemas/userSchema-Post");
const userSchemaPUT = require("../schemas/userSchema-PUT");

const {
  getUser,
  getUserId,
  postUsers,
  putUsers,
  deleteUser,
} = require("../controllers/users");

const checkEmailUsers = require("../middlewares/checkEmailUsers");
const checkIdUsers = require("../middlewares/checkIdUsers");

const router = express.Router();

router.get("/", getUser);
router.get("/:id", checkIdUsers, getUserId);

router.post(
  "/",
  validationMiddleware(userSchemaPOST),
  checkEmailUsers,
  postUsers
);
router.put("/:id", validationMiddleware(userSchemaPUT), checkIdUsers, putUsers);
router.delete("/:id", checkIdUsers, deleteUser);

module.exports = router;
