'use strict'

const db = require('APP/db')
    , {Order, User} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('Order', () => {
  let order, user;
  before('Await database sync', () => db.didSync)
  beforeEach(() => {
    return User.create({
      firstName: 'Implement',
      lastName: 'Query',
      email: 'getalist@all.com',
      // photo: ,
      admin: true,
      creditCard: '4716-2210-5188-5662',
      creditCardExpirationDate: '12/18',
      creditCardCVV: 123,
      houseNumber: 1234,
      addressLine1: 'Inner Join rd',
      // addressLine2:
      city: 'You Should Double',
      state: 'NY'
    })
    .then(u => {
      user = u;
    })
    .then(() => {
      return Order.create({
        subtotal: 44.44,
        tax: 4.44,
        // shippingOptions: go to default
        // shippingPrice: let setter do it
        firstName: 'Implement',
        lastName: 'Query',
        email: 'getalist@all.com',
        houseNumber: 1234,
        addressLine1: 'Inner Join rd',
        // addressLine2:
        city: 'You Should Double',
        state: 'NY',
        creditCard: '375556917985515',
        // user_id: users.god.id
      })
    })
    .then(o => {
        order = o;
    })
  })
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('hook: sendDate', () => {
    it('originally set to null', () => {
      expect(order.sendDate).to.equal(null);
    });
    it('is set to date when status changes to completed', () => {
      order.update({
        status: 'completed'
      })
      .then(updatedOrder => {
        console.log(updatedOrder.sendDate)
        expect(updatedOrder.sendDate).to.be.above(1400000000000);
      })
    })
  });

  describe('virtual method: shippingPrice', () => {
    it('gets price of shipping based on shipping option', () => {
      expect(order.shippingPrice).to.equal(2.00);
      order.update({shippingOption: 'express'})
      expect(order.shippingPrice).to.equal(5.00);
    })
  });
});
