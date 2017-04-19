'use strict'

const db = require('APP/db')
    , {User, Product, Order, Review, OrderProduct, Promise} = db
    , {mapValues} = require('lodash')

// function seedEverything() {
//   const seeded = {
//     users: users(),
//     things: things(),
//   }

//   seeded.favorites = favorites(seeded)

function seedEverything() {
  const seeded = {
    users: users(),
    orders: orders(),
    reviews: reviews(),
    products: products(),
    orderProducts: orderProducts()
  }

  return Promise.props(seeded)
}

// no join tables? 
// seeded.favorites is for join tables...


const users = seed(User, {
  god: {
    firstName: 'Implement',
    lastName: 'Query',
    email: 'getalist@all.com',
    // photo: go to default
    admin: true,
    creditCard: '4444 2222 3333 4444',
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
    creditCard: '4444 3333 2222 1111',
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
    description: 'Implement a Circular Array class that supports an array-like data structure which can be efficiently rotated',
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

const orders = seed(Order, {
  smallest: {
    // date: let setter do it
    // status: go to default
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
    creditCard: '4444 2222 3333 4444'
  },
  dingus: {
    // date: let setter do it
    // status: go to default
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
    creditCard: '4444 8888 5555 9999'
  },
  largest: {
    // date: let setter do it
    // status: go to default
    subtotal: 22.44,
    tax: 4.22,
    // shippingOptions: go to default
    // shippingPrice: let setter do it
    firstName: 'This',
    lastName: 'Problem',
    email: 'solvedby@all.com',
    houseNumber: 4321,
    addressLine1: 'DepthFirst',
    // addressLine2:
    city: 'Solutions',
    state: 'NY',
    creditCard: '4444 3333 2222 1111'
  }
})

const reviews = seed(Review, {
  cracking: {
    title: '189',
    content: 'Numebrs are randomly generated and passed to a method. Write a program to find and maintain the median value as new values are generated.',
    rating: 5
  },
  multi: {
    title: 'Re-space',
    content: 'Consider a simple data structure called BiNode, which has pointers to two other nodes.',
    rating: 3
  },
  George: {
    title: 'Re-shorters',
    content: 'Given a string b and an array of smaller strings T, design a method to search b for each small string in T',
    rating: 1
  }
})

const orderProducts = seed(OrderProduct, {
  smallest: {
    quantity: 100,
    unitPrice: 1000.00
  },
  dingus: {
    quantity: 44,
    unitPrice: 111.00
  },
  largest: {
    quantity: 445,
    unitPrice: 4.00
  }
})

// const favorites = seed(Favorite,
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
//       thing_id: things.surfing.id  // Same thing for things.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: things.smiting.id
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
