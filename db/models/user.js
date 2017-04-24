'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN, INTEGER} = require('sequelize')

module.exports = db => db.define('users', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  photo: {
    type: STRING,
    defaultValue: `http://wpshowdown.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png`,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  admin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  houseNumber: INTEGER,
  addressLine1: STRING,
  addressLine2: STRING,
  city: STRING,
  state: STRING,
  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate (plaintext) {
      return bcrypt.compare(plaintext, this.password_digest)
    },
    fullName () {
      return `${this.firstName} ${this.lastName}`;
    }
  }
})

module.exports.associations = (User, {OAuth, Order, Review}) => {
  User.hasOne(OAuth)
  User.hasMany(Order)
  User.hasMany(Review)
}

const setEmailAndPassword = user => {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
}


