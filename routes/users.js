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

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserId);
router.post("/", validationMiddleware(userSchemaPOST), postUsers);
router.put("/:id", validationMiddleware(userSchemaPUT), putUsers);
router.delete("/:id", deleteUser);

module.exports = router;
