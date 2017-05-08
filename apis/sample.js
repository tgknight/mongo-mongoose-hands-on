'use strict'

const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/mongoose'

mongoose.connect(url)

const db = mongoose.connection
const operation = () => {
  let kittySchema = mongoose.Schema({
    name: String
  })
  kittySchema.methods.speak = function () {
    console.log(this)
    console.log(this.name ? `Meow name is ${this.name}` : 'I don\'t have a name')
  }
  let Kitten = mongoose.model('Kitten', kittySchema)
  let silence = new Kitten({
    name: 'silence'
  })
  silence.save((err, silence) => silence.speak())
}
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', operation)

