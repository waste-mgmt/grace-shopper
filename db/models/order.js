'use strict'

const bcrypt = require('bcryptjs')
    , {ENUM, VIRTUAL, DATE} = require('sequelize')

module.exports = db => db.define('order', {
  sendDate: {
    type: DATE,
    allowNull: true
  },
  status: {
    type: ENUM('created', 'cancelled', 'completed'),
    defaultValue: 'created',
    allowNull: false,
    set: function (val) {
      if (val === 'completed') {
        this.setDataValue('sendDate', Date.now())
      }
    }
  },
  subtotal: {
    type: VIRTUAL,
    get: function () {
      return this.getProducts().reduce((acc, prod) => acc + (prod.price * prod.quantity), 0)
    }
  },
  tax: {
    type: VIRTUAL,
    get: function () {
      return this.getUser.state === 'New York' ? this.subtotal * 8.875 : 0
    }
  },
  shippingOption: {
    type: ENUM('standard', 'express'),
    defaultValue: 'standard',
    allowNull: false
  },
  shippingPrice: {
    type: VIRTUAL,
    get: function () {
      return this.shippingOption === 'standard' ? 200 : 500
    }
  },
  total: {
    type: VIRTUAL,
    get: function () {
      return this.subtotal + this.tax + this.shippingPrice
    }
  }
})

module.exports.associations = (Order, {User, OrderProduct}) => {
  Order.belongsTo(User)
  Order.hasMany(OrderProduct, {as: 'product'})
}



