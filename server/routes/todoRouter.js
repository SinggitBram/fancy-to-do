const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/',todoController.getAllTodo)
router.get('/',todoController.getIdTodo)
router.post('/',todoController.addTodo)
router.delete('/:id',todoController.deleteTodo)
router.put('/:id',todoController.editTodo)