'use strict'

/*
 https://github.com/chriso/validator.js/blob/master/test/validators.js

 above is the sequelize validate tests which includes examples of valid test data

 */

const db = require('APP/db')
    , {User, Product, Order, Review, OrderProduct, Promise} = db
    , {mapValues} = require('lodash')


function seedEverything() {
  const seeded = {
    users: users(),
    products: products()
  }

  seeded.reviews = reviews(seeded)
  seeded.orders= orders(seeded)
  seeded.orderProducts = orderProducts(seeded)
  return Promise.props(seeded)
}

// no join tables? 
// seeded.favorites is for join tables...


const users = seed(User, {
  god: {
    firstName: 'Implement',
    lastName: 'Query',
    email: 'getalist@all.com',
    // photo: ,
    admin: true,
    creditCard: '4716-2210-5188-5662',
    creditCardExpirationDate: '12/18',
    creditCardCVV: 123,
    houseNumber: 1234,
    addressLine1: 'Inner Join rd',
    // addressLine2:
    city: 'You Should Double',
    state: 'NY'
  },
  barack: {
    firstName: 'This',
    lastName: 'Problem',
    email: 'solvedby@all.com',
    // photo: go to default
    // admin: go to default
    creditCard: '6234917882863855',
    creditCardExpirationDate: '18/12',
    creditCardCVV: 321,
    houseNumber: 4321,
    addressLine1: 'DepthFirst',
    // addressLine2:
    city: 'Solutions',
    state: 'NY'
  },
})

const products = seed(Product, {
  full: {
    name: 'Circular Array',
    description: 'Implement a Circular Array class that supports an array-like data structure which can be efficiently rotated efficiently rotated efficiently rotated efficiently rotated efficiently rotated efficiently rotated',
    price: 14.34,
    inventory: 40,
    // photo: go to default
    category: 'animal'
  },
  join: {
    name: 'Inner Join',
    description: 'The result set would contain only the data where the criteria match. In our example, we would get three records: one with a COCACOLA code and two with PEPSI codes.',
    price: 99.99,
    inventory: 4,
    // photo: go to default
    category: 'plant'
  }
})


const orders = seed(Order,
  ({users}) => ({
    smallest: {
      subtotal: 44.44,
      tax: 4.44,
      // shippingOptions: go to default
      // shippingPrice: let setter do it
      firstName: 'Implement',
      lastName: 'Query',
      email: 'getalist@all.com',
      houseNumber: 1234,
      addressLine1: 'Inner Join rd',
      // addressLine2:
      city: 'You Should Double',
      state: 'NY',
      creditCard: '375556917985515',
      users_id: users.god.id
    },
    dingus: {
      subtotal: 555.44,
      tax: 45.55,
      // shippingOptions: go to default
      // shippingPrice: let setter do it
      firstName: 'Derek',
      lastName: 'Jeter',
      email: 'doofus@all.com',
      houseNumber: 4444,
      addressLine1: 'Outer Join rd',
      // addressLine2:
      city: 'You Coldn"t Double',
      state: 'NY',
      creditCard: '2718760626256570',
      users_id: users.barack.id
    }
  })
)

const reviews = seed(Review,
  ({users, products}) => ({
    cracking: {
      title: '189',
      content: 'Numebrs are randomly generated and passed to a method. Write a program to find and maintain the median value as new values are generated.',
      rating: 5,
      users_id: users.god.id,
      product_id: products.full.id
    },
    multi: {
      title: 'Re-space',
      content: 'Consider a simple data structure called BiNode, which has pointers to two other nodes. Lorem ipsum Lorem ipsum Lorem ipsum v v Lorem ipsum Lorem ipsum Lorem ipsum',
      rating: 3,
      users_id: users.barack.id,
      product_id: products.join.id
    }
  })
)



const orderProducts = seed(OrderProduct, ({products,orders}) =>  ({
  smallest: {
    quantity: 100,
    unitPrice: 1000.00,
    order_id:orders.smallest.id,
    product_id:products.full.id
  },
  dingus: {
    quantity: 44,
    unitPrice: 111.00,
    order_id:orders.dingus.id,
    product_id:products.join.id
  },
  largest: {
    quantity: 445,
    unitPrice: 4.00
  }
}))

// const favorites = seed(User,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({users, things}) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama loves surfing': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//                                    // that we created in the user seed above.
//                                    // The seed function wires the promises so that it'll
//                                    // have been created already.
//       product_id: products.surfing.id  // Same thing for things.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       product_id: products.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: things.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: things.puppies.id
//     },
//   })
// )

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, orders, reviews, products, orderProducts})
