const db = require('APP/db')
const Product = db.model('product')

module.exports = require('express').Router()

  .param('id', (req, res, next, id) => {
    Product.findbyId(id)
      .then(foundProduct => {
        if (!foundProduct) throw Error('omg error 404')
        req.product = foundProduct
        next()
      })
      .catch(next)
  })

  .get('/:id', (req, res, next) => {
    res.send(req.product)
  })


  .get('/', (req, res, next) => {
    Product.findAll().then(allProducts => res.send(allProducts)).catch(next)
  })

  .post('/', (req, res, next) => {
      Product.create(req.body)
        .then(createdProduct => {
          res.status(201).send(createdProduct)
        })
        .catch(next)
  })

  .put('/:id', (req, res, next) => {
    req.product.update(req.body)
      .then(updatedProduct => {
        res.send(updatedProduct)
      })
      .catch(next)
  })


  .delete('/:id', (req, res, next) => {
    req.product.destroy().then(destroyedItem => console.log('destroyed',destroyedItem)).catch(next)
  })