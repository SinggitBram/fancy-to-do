require('dotenv').config()
const { User } = require("../models")
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {

    static loginUser = (req, res) => {
        let { email, password } = req.body
        User.findOne({
            where: { email }
        })
            .then(data => {
                if (!data) {
                    res.status(400).json({ msg: `email not registered` })
                } else {
                    if (bcrypt.compareSync(password, data.password)) {
                        let token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET);
                        res.status(200).json({ token })
                    } else {
                        res.status(400).json({ msg: `wrong email or password` })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({ error: err, msg: `internal server error` })
            })
    }

    static registerUser = (req, res) => {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(req.body.email)
        User.findOne({
            where: { email: req.body.email }
        })
            .then(data => {
                if (data) {
                    console.log(`sampai di sini llho`)
                    res.status(400).json({ msg: `email already taken` })
                } else {                 
                    return User.create(obj)
                }
            })
            .then(data2 => {
                console.log(data2,`--------------------------------------------------------------------`)
                let token = jwt.sign({ id: data2.id, email: data2.email }, process.env.JWT_SECRET);
                res.status(201).json({ token})
            })
            .catch(err => {
                if (err.errors) {
                    let errorTemp = []
                    err.errors.forEach((ele) => {
                        errorTemp.push({
                            type: ele.type,
                            msg: ele.message
                        })
                    })
                    res.status(400).json({ errorTemp })
                } else {
                    res.status(500).json({ error: err, msg: `internal server error` })
                }
            })
    }
}

module.exports = UserController