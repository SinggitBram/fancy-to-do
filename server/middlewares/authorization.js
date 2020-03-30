const { Todo } = require("../models")

function authorizationUser(req,res,next){
    let id = Number(req.params.id)
    Todo.findOne({
        where:{id:id}
    })
    .then(data =>{
        if(!data){
            res.status(404).json({status:404, msg:`data not found`})
        }
        else{
            if(data.userId == req.userData.id){
                next()
            } else{
                res.status(403).json({status:403,msg:`user not authorized`})
            }
        }
    })
    .catch(err =>{
        next(err)
    })
}

module.exports = authorizationUser