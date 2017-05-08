'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./apis')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/', router)

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/mongoose')

mongoose.connection.once('open', () => {
  app.listen(3000, () => console.log('express mongo started'))
})
