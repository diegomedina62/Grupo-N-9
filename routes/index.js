// const express = require("express");
const {Router} = require('express')
const usersRouter = require("./users");
const transactionsRouter = require('./transactions')
const categoriesRouter = require('./categories')

const router = Router()

// example of a route with index controller get function

router.use("/users", usersRouter);
router.use('/transactions', transactionsRouter)
router.use('/categories', categoriesRouter)


module.exports = router
