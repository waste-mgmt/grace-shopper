'use strict'

const {STRING, TEXT, FLOAT, INTEGER, ENUM} = require('sequelize')

module.exports = db => db.define('product', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      len: [5, 100],
    }
  },
  description: {
    type: TEXT,
    allowNull: false,
    validate: {
      len: [140, 1400],
    }
  },
  price: {
    type: FLOAT(2),
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



// module.exports.associations = (Thing, {User, Favorite}) => {
//
//   Thing.belongsToMany(User, {as: 'lovers', through: Favorite})
// }
