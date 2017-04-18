const db = require('APP/db')
const Review = db.model('review')

module.exports = require('express').Router()

  .param('id', (req, res, next, id) => {
    Review.findbyId(id)
      .then(foundReview => {
        if (!foundReview) throw Error('omg error 404')
        req.review = foundReview
        next()
      })
      .catch(next)
  })

  .get('/:id', (req, res, next) => {
    res.send(req.review)
  })


  .post('/', (req, res, next) => {
    Review.create(req.body) // Front-End includes review info as well userId and productId
      .then(createdReview => {
        res.status(201).send(createdReview)
      })
      .catch(next)
  })

  .put('/:id', (req, res, next) => {
    req.review.update(req.body)
      .then(updatedReview => {
        res.send(updatedReview)
      })
      .catch(next)
  })


  .delete('/:id', (req, res, next) => {
    req.review.destroy().then(destroyedItem => console.log('destroyed',destroyedItem)).catch(next)
  })