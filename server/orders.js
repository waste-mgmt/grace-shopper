'use strict'

const db = require('APP/db')
const Order = db.model('order')
const OrderProduct = db.model('orderProduct')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
// param middleware to set order from req.params.id to req.order
  .param('id', (req, res, next, id) => {
    Order.findById(id)
    .then(foundOrder => {
      if (!foundOrder) {
        const err = new Error ('No order found!');
        err.status = 404;
        throw err;
      }
      req.order = foundOrder;
      next();
    })
    .catch(next);
  })
  // show all orders
  .get('/', (req, res, next) => {
    Order.findAll()
    .then(allOrders => {
      if (!allOrders.length) res.status(404).send('No orders found!');
      else res.send(allOrders);
    })
    .catch(next);
  })
  // create new order from cart
  .post('/', (req, res, next) => {
    Order.create(req.body.user) // req.body will have a user and cart (an array of objs with prod & qty)
    .then(createdOrder => {
      req.body.cart.forEach(pQ => {
        return OrderProduct.create(pQ.quantity)
        .then(op => {
          op.setProduct(pq.product)
          .then(opWithProd => {
            opWithProd.setOrder(createdOrder)
          })
        })
      })
    })
    .catch(next);
  })

  // show one order
  .get('/:id', (req, res, next) => {
    res.send(req.order)
    .catch(next);
  })
  // update an order (includes setting an order to cancelled)
  .put('/:id', (req, res, next) => {
    req.order.update(req.body)
    .then(updatedOrder => {
      res.status(201).send(updatedOrder);
    })
    .catch(next);
  })





