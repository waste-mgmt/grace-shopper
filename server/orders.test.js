const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start');

describe('/api/orders', () => {

  const Order = db.Order;

  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

  describe('does not return non-existent orders', () => {
    it('returns 404 if no orders in database', done => {
      request(app)
        .get(`/api/orders`)
        .expect(404, done);
    });
  });

  describe('gets/posts/puts/deletes existing orders', () => {

    let o1 = '';
    let o2 = '';
    let o3 = '';

    beforeEach('Dummy Data', () => {
      const first = Order.create({
        subtotal: 101.11,
        tax: 1.11,
        firstName: 'bill',
        lastName: 'cutting',
        email: 'bullcitting@gmail.com',
        houseNumber: 123,
        addressLine1: 'chicago',
        city: 'new york',
        state: 'NY',
        creditCard: 5105105105105100,
      });
      const second = Order.create({
        subtotal: 234.21,
        tax: 2.21,
        firstName: 'daren',
        lastName: 'mitch',
        email: 'dmitch@gmail.com',
        houseNumber: 332,
        addressLine1: 'new york',
        city: 'new york',
        state: 'NY',
        creditCard: 5105105105105100,
      });
      const third = Order.create({
        subtotal: 66.66,
        tax: 6.66,
        firstName: 'philly',
        lastName: 'cheese',
        email: 'sandwich@gmail.com',
        houseNumber: 555,
        addressLine1: 'philly',
        city: 'new york',
        state: 'NY',
        creditCard: 5105105105105100,
      });

      return Promise.all([first, second, third])
        .then(([firstO, secondO, thirdO]) => {
          o1 = firstO.id;
          o2 = secondO.id;
          o3 = thirdO.id;
        })
        .catch();
    });
    
    describe('gets all orders', () => {
      it('gets all orders in database', done => {
        request(app)
          .get(`/api/orders`)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body).to.be.instanceOf(Array);
            expect(res.body).to.have.length(3);
            done();
          });
      });
    });
    // test not working;

    describe('gets one order', () => {
      it('gets one specific order', done => {
        request(app)
          .get(`/api/orders/${o1}`)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body).to.be.instanceOf(Object);
            expect(res.body.firstName).to.equal('bill');
            done();
          });
      });
      it('gets another specific order', done => {
        request(app)
          .get(`/api/orders/${o2}`)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body).to.be.instanceOf(Object);
            expect(res.body.firstName).to.equal('daren');
            done();
          });
      });
      it('returns 404 for non-existent orders', done => {
        request(app)
          .get(`/api/reviews/12345566`)
          .expect(404, done);
      });
    });

    describe('creates new order', () => {
      it('returns new review', done => {
        request(app)
          .post(`/api/orders`)
          .send({
            subtotal: 55.66,
            tax: 65.66,
            firstName: 'crack',
            lastName: 'slick',
            email: 'sammaamamam@gmail.com',
            houseNumber: 777,
            addressLine1: 'dingo',
            city: 'baby',
            state: 'NY',
            creditCard: 5105105105105100,
          })
          .expect(201)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.firstName).to.equal('crack');
            Order.findById(res.body.id)
              .then(order => {
                expect(order).to.not.be.null;
                done();
              })
              .catch(done);
          });
      });
    });

    describe('updates order', () => {
      it('returns updated order', done => {
        request(app)
          .put(`/api/orders/${o1}`)
          .send({firstName: "pavel"})
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.firstName).to.equal('pavel');
            done();
          });
      });
      it('get requests for updated order return updated order', done => {
        request(app)
          .get(`/api/orders/${o1}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.firstName).to.equal('pavel');
            done();
          })
      }
      it('shipping date set when order updated to "completed"', done => {
        request(app)
          .put(`/api/orders/${o1}`)
          .send({status: 'completed'})
          .expect(201)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.sendDate).to.not.be.null;
            done();
          });
      });
      it('shipping data not se when order status updated to "cancelled"', done => {
        request(app)
          .put(`/api/orders/${o2}`)
          .send({status: 'cancelled'})
          .expect(201)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.sendDate).to.be.null;
            done();
          });
      });
    });
  });
});