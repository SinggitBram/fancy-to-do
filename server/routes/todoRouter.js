const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const authenticationUser = require("../middlewares/authentication")
const authorizationUser = require("../middlewares/authorization")

router.get('/holidays',TodoController.listHolidays)
router.get('/',authenticationUser,TodoController.getAllTodo)
router.post('/',authenticationUser,TodoController.addTodo)
router.get('/:id',authenticationUser,authorizationUser,TodoController.getOneTodo)
router.delete('/:id',authenticationUser,authorizationUser,TodoController.deleteTodo)
router.put('/:id',authenticationUser,authorizationUser,TodoController.editTodo)

module.exports = router