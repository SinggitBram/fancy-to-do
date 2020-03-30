const { Todo } = require("../models")

function authorizationUser(req,res,next){
    let id = Number(req.params.id)
    Todo.findOne({
        where:{id:id}
    })
    .then(data =>{
        if(data.userId == req.userData.id){
            next()
        }else{
            throw new Error(`user not authorized`)
        }
    })
    .catch(err =>{
        next({
            status_code: 400,
            type: 'Bad Request',
            message: err.message
        })
    })
}


module.exports = authorizationUser