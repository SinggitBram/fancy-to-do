const express = require('express')
const router = express.Router()
const todoRoutes = require('./todoRouter')
const userRoutes = require('./userRouter')

router.use('/todos', todoRoutes)
router.use('/users', userRoutes)

module.exports = router