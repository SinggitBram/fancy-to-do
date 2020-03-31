const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticationUser(req, res, next) {
    try {
        const { accessToken } = req.headers
        if(!accessToken){
            res.status(404).json({msg:`token not found`})
        }else{
            let decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            req.userData = decoded
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authenticationUser