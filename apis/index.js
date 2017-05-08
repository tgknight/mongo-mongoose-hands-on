'use strict'

const router = require('express').Router()
const Kitten = require('./model')

// list operation
router.get('/kitten', (req, res, next) => {
  const query = Kitten.find()
  query.exec((err, kittens) => {
    if (err) res.json(err)
    else res.json({ kittens })
  })
})

// get operation
router.get('/kitten/:id', (req, res, next) => {
  const { id } = req.params
  const query = Kitten.findById(id)
  query.exec((err, kitten) => {
    if (err) res.json(err)
    else res.json({ kitten })
  })
})

// create operation
router.post('/kitten', (req, res, next) => {
  const newKitten = new Kitten(req.body)
  newKitten.save((err, newKitten) => {
    if (err) res.json(err)
    else {
      newKitten.speak()
      res.json({ kitten: newKitten })
    }
  })
})

// update operation
router.put('/kitten/:id', (req, res, next) => {
  const { id } = req.params
  const query = Kitten.findByIdAndUpdate(id, req.body, { new: true })
  query.exec((err, updatedKitten) => {
    if (err) res.json(err)
    else res.json({ kitten: updatedKitten })
  })
})

// delete operation
router.delete('/kitten/:id', (req, res, next) => {
  const { id } = req.params
  const query = Kitten.findByIdAndRemove(id)
  query.exec((err) => {
    if (err) res.json(err)
    else res.json({}) // should not let endpoint know the existence of document
  })
})

module.exports = router
