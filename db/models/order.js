'use strict'

const bcrypt = require('bcryptjs')
    , {STRING, ENUM, DECIMAL, DATE, INTEGER} = require('sequelize')

// OB/DY: inconsistent code style...some spaces, some tabs
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
  // OB/DY: something of a standard to use integers (measured in cents) for price data, to avoid floating point math
  subtotal:{ 
  	type: DECIMAL(10,2),
    allowNull: false, // OB/DY: consider trailing commas
  },
  tax:{
  	type: DECIMAL(10,2),
    allowNull: false,
  },
  shippingOption:{
  	type: ENUM('standard', 'express'),
  	defaultValue: 'standard',
    allowNull: false
  },
  shippingPrice: {
    type: DECIMAL(10,2), // OB/DY: could/should be a virtual type
    get: function() {
      return this.shippingOption === 'standard' ? 2.00 : 5.00;
    }
  },
  // OB/DY: this user info is redundant with the user model
  firstName:{
  	type: STRING,
    allowNull: false
    // OB/DY: also not allow empty string (and below, too)
  },
  lastName:{
  	type: STRING,
    allowNull: false // OB/DY: what about Madonna?
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
  // OB/DY: recommend not storing this, sensitive info that you don't want to be responsible for, maybe use a thirdy-party tool like Stripe
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
  hooks: {
    afterUpdate: function(order) {
      // OB/DY: recommend a setter instead
      if (!order.sendDate && order.status === 'completed') {
        order.sendDate = Date.now();
      }
    }
  }


})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}



