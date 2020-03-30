const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const authenticationUser = require("../middlewares/authentication")
const authorizationUser = require("../middlewares/authorization")


router.get('/',authenticationUser,todoController.getAllTodo)
router.post('/',authenticationUser,todoController.addTodo)
router.get('/:id',authenticationUser,authorizationUser,todoController.getOneTodo)
router.delete('/:id',authenticationUser,authorizationUser,todoController.deleteTodo)
router.put('/:id',authenticationUser,authorizationUser,todoController.editTodo)

module.exports = router