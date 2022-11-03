const express = require("express");
const { getUser, getUserId } = require("../controllers/users");

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUserId);

module.exports = router;
