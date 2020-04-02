require('dotenv').config()
const { User } = require("../models")
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require("nodemailer");

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

        User.findOne({
            where: { email: req.body.email }
        })
            .then(data => {
                if (data) {
                    res.status(400).json({ msg: `email already taken` })
                } else {

                    // -------------------------------------------------------
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: process.env.GOOGLE_ID,
                                pass: process.env.GOOGLE_PASS,
                            }
                        });
    
                        // send mail with defined transport object
                        let mailOptions = {
                            from: 'bramtodo@gmail.com',
                            to: req.body.email,
                            subject: 'Selamat Datang di applikasi Bram',
                            text: `aloha`
                        }

                        transporter.sendMail(mailOptions, (err, data) => {
                            if (err) {
                                console.log('Error kirim email: ', err)
                            }else {
                                console.log('email sent')
                            }
                        })
    // ----------------------------------------------------------
                    return User.create(obj)
                }
            })
            .then(data2 => {
                let token = jwt.sign({ id: data2.id, email: data2.email }, process.env.JWT_SECRET);
                res.status(201).json({ token })
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

    static googleSignIn = (req, res, next) => {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let user = {}
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_KEY,
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                user = {
                    email: payload.email,
                    password: `default12345`
                }
                return User.findOne({ where: { email: user.email } })
            })
            .then(userdata => {
                if (userdata) {
                    let token = jwt.sign({ id: userdata.id, email: userdata.email }, process.env.JWT_SECRET)
                    res.status(200).json({ token })
                } else {
                    return User.create(user)
                }
            })
            .then(result => {
                let token = jwt.sign({ id: result.id, email: result.email }, process.env.JWT_SECRET)
                res.status(200).json({ token })
            })
            .catch(err => {
                if (err) {
                    next(err)
                } else {
                    next({ status: 400, msg: `Failed` })
                }
            })
    }
}

module.exports = UserController