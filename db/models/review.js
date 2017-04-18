'use strict'

const {STRING, TEXT, ENUM} = require('sequelize')

module.exports = db => db.define('review', {
    title: {
        type: STRING,
        allowNull: false
    },
    content: {
        type: TEXT,
        validate: {
            notNull: true,
            len: [100, 2800]
            }
    },
    rating: {
        type: ENUM(1,2,3,4,5)
    }

}, {})

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}
