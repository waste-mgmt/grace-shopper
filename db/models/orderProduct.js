'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {INTEGER} = require('sequelize')

module.exports = db => db.define('orderProduct', {
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  unitPrice: {
    type: INTEGER
  }
})

module.exports.associations = (OrderProduct, {Order, Product}) => {
  OrderProduct.belongsTo(Order)
  OrderProduct.belongsTo(Product)
}
