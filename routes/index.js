const express = require("express");
const router = require("./users");
const usersRouter = require("./users");

// example of a route with index controller get function
router.use("/users", usersRouter);
router.use("/transactions", TransactionsRouter);

module.exports = router;
