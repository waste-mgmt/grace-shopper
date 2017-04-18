'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {INTEGER, FLOAT} = require('sequelize')

module.exports = db => db.define('orderProduct', {
  quantity: {
    type: INTEGER
    // can we set default from the front end?
    // defaultValue: 1
  },
  unitPrice: {
    type: FLOAT(2)
    // we can add this from the front end. Otherwse:
    // set: this.setDataValue('unitPrice', this.product.price)
  }
})

module.exports.associations = (OrderProduct, {Order, Product}) => {
  OrderProduct.belongsTo(Order)
  OrderProduct.belongsTo(Product)
}
