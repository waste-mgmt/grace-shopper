'use strict'

const {STRING, TEXT, INTEGER} = require('sequelize')

// OB/DY: inconsistent indentation with other files
module.exports = db => db.define('review', {
    title: {
        type: STRING,
        allowNull: false
        // OB/DY: also check for empty string
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

}, {})

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User)
  Review.belongsTo(Product)
}
