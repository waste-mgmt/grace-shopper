'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {INTEGER, DECIMAL} = require('sequelize')

module.exports = db => db.define('orderProduct', {
  quantity: {
    type: INTEGER
    // can we set default from the front end? // OB/DY: sure, but can also have a default value here
    // defaultValue: 1
  },
  unitPrice: {
    type: DECIMAL(10,2)
    // we can add this from the front end. Otherwse:
    // set: this.setDataValue('unitPrice', this.product.price)
  }
})

module.exports.associations = (OrderProduct, {Order, Product}) => {
  OrderProduct.belongsTo(Order)
  OrderProduct.belongsTo(Product)
}
