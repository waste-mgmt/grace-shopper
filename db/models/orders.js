'use strict'

const bcrypt = require('bcryptjs')
    , {STRING, ENUM, FLOAT, DATE, INTEGER} = require('sequelize')

module.exports = db => db.define('orders', {
  date: {
  	type: DATE,
  	set: function() {
  		this.setDataValue('date', Date.now())
  	}
  },
  subtotal: FLOAT(2),
  tax: FLOAT(2),
  shippingOptions: ENUM('standard', 'express'),
  shippingPrice: {
  	type: FLOAT(2),
  	set: function() {
  		this.setDataValue('shippingPrice', this.shippingOptions === 'standard' ? 2.00 : 5.00)
  	}
  },
  firstName:{
  	type: STRING,
  	validate: {
  		notNull: true 
  	}
  },
  lastName:{
  	type: STRING,
  	validate: {
  		notNull: true 
  	}
  },
  email: {
  	type: STRING,
  	validate: {
  		isEmail: true,
  		notNull: true 
  	}
  },
  houseNumber:{
  	type: INTEGER,
  	validate: {
  		notNull: true 
  	}
  },

  addressLine1:{
  	type: STRING,
  	validate: {
  		notNull: true 
  	}
  },
  addressLine2:{
  	type: STRING,
  	validate: {
  		notNull: true 
  	}
  },
  city:{
  	type: STRING,
  	validate: {
  		notNull: true 
  	}
  },
  state:{
  	type: STRING,
  	validate: {
  		notNull: true 
  	}
  },
  creditCard: {
  	type: STRING,
  	validate: {
  		isCreditCard: true,
  		notNull: true 
  	}
  }
}, {
  setterMethods: {
  	//subtotal = Quantiny*Price of product 
  	//taxes = subtotal * state rate
  }, {
  getterMethods: {
  	//totalPrice = Quantiny*Price of product + shipping + taxes 
  }
  	
  }

})

module.exports.associations = (Favorite, {Thing, User}) => {
  Favorite.belongsTo(Thing)
  Favorite.belongsTo(User)
}

