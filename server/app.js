require ('dotenv').config()
const cors = require('cors')
const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', routes)

app.listen(port, function(){console.log(`listening to port ${port}`)})