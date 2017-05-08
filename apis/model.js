'use strict'

const mongoose = require('mongoose')

// kittySchema from mongoose schema
const kittySchema = mongoose.Schema({
  name: String
})

// schema pre/post hooks
kittySchema.pre('save', function(next) {
  console.log('In process of getting new kitty...')
  next()
})

kittySchema.post('save', function(doc) {
  console.log(`New kitty ${doc.name} has been added!`)
})

// schema custom methods
kittySchema.methods.speak = function () {
  console.log(this.name ? `Meow name is ${this.name}` : 'I don\'t have a name')
}

// Kitten model from kittySchema
module.exports = mongoose.model('Kitten', kittySchema)
