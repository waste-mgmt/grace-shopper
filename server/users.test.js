const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start');

/* global describe it before afterEach */

describe('/api/users', () => {

  const User = db.User;

  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

  // 'GET /'
  describe('GET /', () => {

    describe('gets all users', () => {

      before('Dummy data', () => {
        return User.create({
          firstName: 'a',
          lastName: 'b',
          email: 'a@b.com',
          // photo: default,
          admin: false,
          creditCard: 5105105105105100,
          creditCardExpirationDate: '12/18',
          creditCardCVV: 333,
          houseNumber: 1234,
          addressLine1: 'c',
          city: 'd',
          state: 'NY',
      })
        .then( () => {
          return User.create({
            firstName: 'f',
            lastName: 'd',
            email: 'e@b.com',
            // photo: default,
            admin: false,
            creditCard: 5105105105105100,
            creditCardExpirationDate: '12/18',
            creditCardCVV: 333,
            houseNumber: 1234,
            addressLine1: 'r',
            city: 'g',
            state: 'NY',
          });
        })});
      afterEach('Clear the tables', () => db.truncate({ cascade: true }));

      it('returns all users in database', (done) => {
        request(app)
          .get(`/api/users`)
          .expect(200)
          .end( (err, res) => {
            if(err) return done(err);
            expect(res.body).to.be.instanceOf(Array);
            expect(res.body).to.have.length(2);
            done();
          });
      });
    });

    describe('does not get non-existent users', () => {
      it('returns 404 if no users in database', (done) => {
        request(app)
          .get(`/api/users`)
          .expect(404, done);
      });
    });
  });

  'POST /'
  describe('POST /', () => {
    describe('creates new user', () => {
      it('returns new user', (done) => {
        request(app)
          .post(`/api/users`)
          .send({
            firstName: 'f',
            lastName: 'd',
            email: 'e@b.com',
            // photo: default,
            admin: false,
            creditCard: 5105105105105100,
            creditCardExpirationDate: '12/18',
            creditCardCVV: 333,
            houseNumber: 1234,
            addressLine1: 'r',
            city: 'g',
            state: 'NY',
          })
          // .expect(201)
          .end( (err, res) => {
            if (err) return done(err);
            expect(res.body.firstName).to.equal('f');
            User.findById(res.body.id)
              .then( user => {
                expect(user).to.not.be.null;
                done();
              })
              .catch(done);
          });
      });
    });
    describe('admins and new users can create user', () => {
      xit('admins can create users', () => {

      });
      xit('new users can create users', () => {

      });
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