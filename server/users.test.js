const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start');

/* global describe it before afterEach */

describe('/api/users', () => {
  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

  // 'GET /'
  describe('GET /', () => {
    describe('gets all users', () => {
      it('returns all users in database', () => {

      });
      it('returns 404 if no users in database', () => {

      });
    });
  });

  // 'POST /'
  describe('POST /', () => {
    describe('creates new user', () => {
      it('returns new user', () => {

      });
    });
    describe('admins and new users can create user', () => {
      it('admins can create users', () => {

      });
      it('new users can create users', () => {

      })
    });
  });

  // 'GET /:id'
  describe('GET /:id', () => {
    describe('gets one user', () => {
      it('returns one specific user', () => {

      });
      it('returns other specific user', () => {

      });
      it('if userId is not in database, returns 404', () => {

      });
    });
  });

  // 'PUT /:id'
  describe('POST /:id', () => {
    describe('updates user', () => {
      it('returns updated user', () => {

      });
    });
    describe('only admins and authorized users can update users', () => {
      it('authorized users can update themselves', () => {

      });
      it('authorized users cannot update other users', () => {

      });
      it('admins can update any user', () => {

      });
    })
  });

  // 'DELETE /:id'
  describe('DELETE /:id', () => {
    describe('destroys user', () => {
      it('returns 204', () => {

      });
    });
    describe('only admins and authorized users can destroy users', () => {
      it('authorized users can destroy themselves', () => {

      });
      it('authorized users cannot destory other users', () => {

      });
      it('admins can update any user', () => {

      });
    });
  });

  // 'GET /:id/orders'
  describe('GET /:id/orders', () => {
    describe('gets all users orders', () => {
      it('returns all users orders', () => {

      });
      it('if users has no orders, get 404', () => {

      });
    });
  });

  // 'GET /:id/orders/:orderId'
  describe('GET /:id/orders/:orderId', () => {
      it('returns one specific order', () => {

      });
      it('returns other specific order', () => {

      });
      it('if orderId is not in database, returns 404', () => {

      });
  });

  // 'GET /:id/reviews'
  describe('GET /:id/reviews', () => {
    describe('gets all users reviews', () => {
      it('returns all users reviews', () => {

      });
      it('if users has no reviews, get 404', () => {

      });
    });
  });

  // 'GET /:id/reviews/:reviewId'
  describe('GET /:id/reviews/:reviewId', () => {
      it('returns one specific review', () => {

      });
      it('returns other specific review', () => {

      });
      it('if reviewId is not in database, returns 404', () => {

      });
  });



  // describe('GET /:id', () =>
  //   describe('when not logged in', () =>
  //     it('fails with a 401 (Unauthorized)', () =>
  //       request(app)
  //         .get(`/api/users/1`)
  //         .expect(401)
  //     )))

  // describe('POST', () =>
  //   describe('when not logged in', () => {
  //     it('creates a user', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'beth@secrets.org',
  //           password: '12345'
  //         })
  //         .expect(201))

  //     it('redirects to the user it just made', () =>
  //       request(app)
  //         .post('/api/users')
  //         .send({
  //           email: 'eve@interloper.com',
  //           password: '23456',
  //         })
  //         .redirects(1)
  //         .then(res => expect(res.body).to.contain({
  //           email: 'eve@interloper.com'
  //         })))
  //   }))
})
