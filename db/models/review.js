'use strict'

const {STRING, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('review', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: TEXT,
    validate: {
      len: [50, 2800]
    },
    allowNull: false
  },
  rating: {
    type: INTEGER,
    min: 1,
    max: 5
  }
})

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}
