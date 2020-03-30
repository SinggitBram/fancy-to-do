const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/',todoController.getAllTodo)
router.get('/:id',todoController.getOneTodo)
router.post('/',todoController.addTodo)
router.delete('/:id',todoController.deleteTodo)
router.put('/:id',todoController.editTodo)

module.exports = routerTodo