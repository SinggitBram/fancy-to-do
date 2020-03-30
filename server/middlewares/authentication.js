const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticationUser(req, res, next) {
    const { token } = req.headers
    try {
        let user_payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = user_payload
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authenticationUser