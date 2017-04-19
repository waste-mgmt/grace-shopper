  'use strict'

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
    , {STRING, VIRTUAL, BOOLEAN, INTEGER} = require('sequelize')

module.exports = db => db.define('users', {
  firstName: STRING,
  lastName: STRING,
  email: {
    type: STRING,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    }
  },
  photo: {
    type: STRING,
    defaultValue: `http://wpshowdown.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png`,
    allowNull: false,
    validate: {
      // look out for problems with the isUrl
      isUrl: true,
    }
  },
  admin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  creditCard: {
    type: STRING,
    validate: {
      isCreditCard: true
    }
  },
  creditCardExpirationDate: STRING,
  creditCardCVV: INTEGER,
  houseNumber: INTEGER,
  addressLine1: STRING,
  addressLine2: STRING,
  city: STRING,
  // should state be forced as two letters, or left open to the user?
  state: STRING,
  // We support oauth, so users may or may not have passwords.
  password_digest: STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
  password: VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword,
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
            err ? reject(err) : resolve(result))
        )
    }
  }
})

module.exports.associations = (User, {OAuth, Order, Review}) => {
  User.hasOne(OAuth)
  // User.belongsToMany(Thing, {as: 'favorites', through: Favorite})
  User.hasMany(Order)
  User.hasMany(Review)
}

const setEmailAndPassword = user => {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return reject(err)
      user.set('password_digest', hash)
      resolve(user)
    })
  )
}


