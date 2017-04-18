'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
// param middleware to set user from req.params.id to req.user
  .param('id', (req, res, next, id) => {
    User.findById(id)
    .then(foundUser => {
      if (!foundUser) {
        const err = new Error ('No user found!');
        err.status = 404;
        throw err;
        // how is this different from:
        // res.status(404).send('No user found!)
      }
      req.user = foundUser;
      next();
    })
    .catch(next);
  })

  .get('/', (req, res, next) => {
    User.findAll()
    .then(allUsers => {
      if (!allUsers) res.status(404).send('No users found!');
      res.send(allUsers);
    })
    .catch(next);
  })

  .post('/', (req, res, next) => {
    User.create(req.body)
    .then(newUser => res.send(newUser))
    .catch(next);
  })

  .get('/:id', (req, res, next) => {
    res.send(req.user);
  })

  .put('/:id', (req, res, next) => {
    req.user.update(req.body)
    .then(updatedUser => res.send(updatedUser))
    .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    req.user.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
  })

  .get('/:id/orders', (req, res, next) => {
    req.user.getOrders()
    .then(orders => {
      if (!orders) res.status(404).send('No orders found!');
      res.send(orders);
    })
    .catch(next)
  })

  .get('/:id/orders/:orderId', (req, res, next) => {
    req.user.getOrders({where: {id: req.params.orderId}})
    .then(order => {
      if (!order) res.status(404).send('No order found!');
      res.send(order);
    })
    .catch(next)
  })

  .get('/:id/reviews', (req, res, next) => {
    req.user.getReviews()
    .then(reviews => {
      if (!reviews) res.status(404).send('No reviews found!');
      res.send(reviews);
    })
    .catch(next)
  })

  .get('/:id/reviews/:reviewId', (req, res, next) => {
    req.user.getReviews({where: {id: req.params.reviewId}})
    .then(review => {
      if (!review) res.status(404).send('No review found!');
      res.send(review);
    })
    .catch(next)
  })

  // .get('/',
  //   // The forbidden middleware will fail *all* requests to list users.
  //   // Remove it if you want to allow anyone to list all users on the site.
  //   //
  //   // If you want to only let admins list all the users, then you'll
  //   // have to add a role column to the users table to support
  //   // the concept of admin users.
  //   forbidden('listing users is not allowed'),
  //   (req, res, next) =>
  //     User.findAll()
  //       .then(users => res.json(users))
  //       .catch(next))
  // .post('/',
  //   (req, res, next) =>
  //     User.create(req.body)
  //     .then(user => res.status(201).json(user))
  //     .catch(next))
  // .get('/:id',
  //   mustBeLoggedIn,
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))



