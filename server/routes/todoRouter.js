const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const authenticationUser = require("../middlewares/authentication")

router.get('/',authenticationUser,todoController.getAllTodo)
router.get('/:id',authenticationUser,todoController.getOneTodo)
router.post('/',authenticationUser,todoController.addTodo)
router.delete('/:id',authenticationUser,todoController.deleteTodo)
router.put('/:id',authenticationUser,todoController.editTodo)

module.exports = routerTodo