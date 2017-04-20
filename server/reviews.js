const db = require('APP/db')
const Review = db.model('review')

module.exports = require('express').Router()

  .param('id', (req, res, next, id) => {
    Review.findById(id)
      .then(foundReview => {
        if (!foundReview) throw Error('omg error 404')
        req.review = foundReview
        next()
      })
      .catch(next)
  })
// gets specific review
  .get('/:id', (req, res, next) => {
    res.send(req.review)
    // if no ID is found, the error is handled above in the .param
  })

// creates new review
  .post('/', (req, res, next) => {
    Review.create(req.body) // Front-End includes review info as well userId and productId
      .then(createdReview => {
        res.status(201).send(createdReview)
      })
      .catch(next)
  })

// updates specific review
  .put('/:id', (req, res, next) => {
    req.review.update(req.body)
      .then(updatedReview => {
        res.send(updatedReview)
      })
      .catch(next)
  })

// deletes specific review
  .delete('/:id', (req, res, next) => {
    req.review.destroy().then(destroyedItem => res.status(204).send()).catch(next)

  })