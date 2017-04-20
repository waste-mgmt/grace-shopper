const db = require('APP/db')
const Product = db.model('product')

module.exports = require('express').Router()

  .param('id', (req, res, next, id) => {
    Product.findById(id)
      .then(foundProduct => {
        if (!foundProduct) {
          const err = new Error ('No products found');
          err.status = 404;
          throw err;
        }
        req.product = foundProduct;
        next();
      })
      .catch(next);
  })
  // Specific product returned
  .get('/:id', (req, res, next) => {
    res.send(req.product);
  })

// All Products returned
  .get('/', (req, res, next) => {
    Product.findAll()
      .then(allProducts => {
        if(!allProducts.length) res.status(404).send('No products found!');
        else res.send(allProducts);
      })
      .catch(next)
  })
// Create new product
  .post('/', (req, res, next) => {
      Product.create(req.body)
        .then(createdProduct => {
          res.status(201).send(createdProduct)
        })
        .catch(next)
  })
// Update specific product
  .put('/:id', (req, res, next) => {
    req.product.update(req.body)
      .then(updatedProduct => {
        res.status(201).send(updatedProduct)
      })
      .catch(next)
  })

// Delete specific product
  .delete('/:id', (req, res, next) => {
    req.product.destroy().then(destroyedItem => res.sendStatus(204)).catch(next)
  })