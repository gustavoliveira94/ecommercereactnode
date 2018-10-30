const express = require('express')
const bodyParser = require('body-parser')

const user = require('./controller/user.controllers')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/teste', user.getUser)


module.exports = app