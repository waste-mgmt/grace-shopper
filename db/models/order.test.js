'use strict'

const db = require('APP/db')
    , {Order, User} = db
    , {expect} = require('chai')

/* global describe it before afterEach */

describe('Order', () => {
  let order, user;
  before('Await database sync', () => db.didSync)
  beforeEach(() => {
    return Order.create({})
    .then(o => {
      order = o
    })
  })
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('sendDate', () => {
    it('originally set to null', () => {
      expect(order.sendDate).to.equal(null)
    })
    it('is set to date when status changes to completed', () => {
      return order.update({
        status: 'completed'
      })
      .then(updatedOrder => {
        console.log(updatedOrder.sendDate)
        expect(updatedOrder.sendDate).to.be.above(1400000000000)
      })
    })
  })

  describe('virtual method: shippingPrice', () => {
    it('gets price of shipping based on shipping option', () => {
      expect(order.shippingPrice).to.equal(200)
      order.shippingOption = 'express'
      expect(order.shippingPrice).to.equal(500)
    })
  })
})
