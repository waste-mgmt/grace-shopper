const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start');

describe('/api/products', () => {

  const Product = db.Product;

  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

  let p1 = '';
  let p2 = '';
  let p3 = '';

  before('Dummy data', () => {
    const first = Product.create({
      
    })
  })
});