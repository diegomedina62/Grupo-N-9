const express = require("express");
const { getUser, getUserId, deleteUser } = require("../controllers/users");

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserId);
router.delete("/:id", deleteUser);

module.exports = router;
