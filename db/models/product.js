'use strict'

const {STRING, TEXT, INTEGER, ENUM} = require('sequelize')

module.exports = db => db.define('product', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [5, 100]
    }
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      len: [140, 1400]
    }
  },
  price: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  inventory: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  photo: {
    type: STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hestem%C3%B8j.jpg/296px-Hestem%C3%B8j.jpg',
    validate: {
      isUrl: true
    }
  },
  category: {
    type: ENUM('animal', 'plant'),
    allowNull: false
  }
}, {
  instanceMethods: {
    // averageRating() {
    //   const ratings = this.getReviews().map(review => (review.rating));
    //   return ratings.reduce((a,b) => (a + b)) / ratings.length;
    // }
    // getAllReviews() {
    //   return this.getReviews();
    // }
  }
})

module.exports.associations = (Product, {Review}) => {
  Product.hasMany(Review)
}