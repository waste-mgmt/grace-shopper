'use strict'

const bcrypt = require('bcryptjs')
    , {STRING, ENUM, DECIMAL, DATE, INTEGER} = require('sequelize')

module.exports = db => db.define('order', {
  sendDate: {
  	type: DATE,
    allowNull: true
  },
	status: {
		type: ENUM('created', 'processing', 'cancelled', 'completed'),
		defaultValue: 'created',
		allowNull: false
	},
  subtotal:{
  	type: DECIMAL(10,2),
    allowNull: false,
  },
  tax:{
  	type: DECIMAL(10,2),
    allowNull: false,
  },
  shippingOptions:{
  	type: ENUM('standard', 'express'),
  	defaultValue: 'standard',
    allowNull: false
  },
  shippingPrice: {
    type: DECIMAL(10,2),
    get: function() {
      return this.shippingOptions === 'standard' ? 2.00 : 5.00;
    }
  },
  firstName:{
  	type: STRING,
    allowNull: false
  },
  lastName:{
  	type: STRING,
    allowNull: false
  },
  email: {
  	type: STRING,
    allowNull: false,
  	validate: {
  		isEmail: true,
  	}
  },
  houseNumber:{
  	type: INTEGER,
    allowNull: false,
  },

  addressLine1:{
  	type: STRING,
    allowNull: false,
  },
  addressLine2:{
  	type: STRING
  },
  city:{
  	type: STRING,
    allowNull: false,
  },
  state:{
  	type: STRING,
    allowNull: false,
  },
  creditCard: {
  	type: STRING,
  	validate: {
  		isCreditCard: true,
  	},
    allowNull: false,
  }
}, {
  setterMethods: {
  	//subtotal = Quantiny*Price of product
  	//taxes = subtotal * state rate
  },
  getterMethods: {
  	//totalPrice = Quantiny*Price of product + shipping + taxes
  },
  hook: {
    afterUpdate: function() {
      if (!this.sendDate && this.status === 'completed') {
        this.sendDate = Date.now();
      }
    }
  }


})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}



