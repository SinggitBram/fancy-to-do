const { Todo } = require("../models")

class TodoController {
    static getAllTodo = (req, res) => {
        Todo.findAll({
            where: { userId: req.userData.id }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err, msg: `internal server error` })
            })
    }

    static getOneTodo = (req, res) => {
        let id = Number(req.params.id)
        Todo.findOne({
            where: { id: id }
        })
            .then(data => {
                if (!data) {
                    res.status(404).json({ msg: `data not found` })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                res.status(500).json({ error: err, msg: `internal server error` })
            })
    }

    static addTodo = (req, res) => {
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            userId: req.userData.id
        }

        Todo.create(obj)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                if(err.errors){
                    let errorTemp = []
                    err.errors.forEach((ele) => {
                        errorTemp.push({
                            type: ele.type,
                            msg: ele.message
                        })
                    })
                    res.status(400).json(errorTemp)
                }else{                    
                    res.status(500).json({msg: `internal server error` })
                }
            })
    }

    static deleteTodo = (req, res) => {
        let id = Number(req.params.id)
        let dataDeleted

        Todo.findOne({
            where:
                { id: id }
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ msg: 'data not found' })
            } else {
                dataDeleted = data
                return Todo.destroy({
                    where: { id: id }
                })
            }
        })
        .then(data2 => {
            res.status(200).json(dataDeleted)
        })
        .catch(err => {
            res.status(500).json({ error: err, msg: `internal server error` })
        })
    }

    static editTodo = (req,res) => {
        let id = Number(req.params.id)
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            userId: req.userData.id
        }
        Todo.update(obj, {where: {id:id}
        })
        .then(data => {
            if(!data[0]){
                res.status(404).json({ msg: 'data not found' })
            }else if (data){
                res.status(200).json(obj)
            }
        })
        .catch(err => {
            if(err.errors){
                let errorTemp = []
                err.errors.forEach((ele) => {
                    errorTemp.push({
                        type: ele.type,
                        msg: ele.message
                    })
                })
                res.status(400).json({errorTemp})
            }else{
                res.status(500).json({ error: err, msg: `internal server error` })
            }
        })
    }
}







module.exports = TodoController