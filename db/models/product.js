'use strict'

const {STRING, TEXT, DECIMAL, INTEGER, ENUM} = require('sequelize')

module.exports = db => db.define('product', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      len: [5, 100],
    }
    // OB/DY: consider unique validator
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      len: [140, 1400],
    }
  },
  // OB/DY: something of a standard to use integers (measured in cents) for price data, to avoid floating point math
  price: {
    type: DECIMAL(10,2),
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
      isUrl: true, // watch out for problems !!
    }
  },
  category: {
    type: ENUM('animal', 'plant'),
    allowNull: false
  },

},{
//this is the options object
})


// OB/DY: more dead code, kill it with fire
// module.exports.associations = (Thing, {User, Favorite}) => {
//
//   Thing.belongsToMany(User, {as: 'lovers', through: Favorite})
// }
