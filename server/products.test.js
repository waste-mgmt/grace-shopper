const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start');

describe('/api/products', () => {

  const Product = db.Product;

  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

  // describe('returns 404 when no products in the database', () => {
  describe('GET ALL', () => {
    it('returns 404 for empty database', done => {
      request(app)
        .get(`/api/products`)
        .expect(404, done);
    });
  });

  describe('GET ALL', () => {

    let p1 = '';
    let p2 = '';
    let p3 = '';

    beforeEach('Dummy data', () => {
      const first = Product.create({
        name: 'example1',
        description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
        price: 4.44,
        inventory: 100,
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hestem%C3%B8j.jpg/296px-Hestem%C3%B8j.jpg',
        category: 'animal'
      });
      const second = Product.create({
        name: 'example2',
        description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
        price: 45.54,
        inventory: 500,
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hestem%C3%B8j.jpg/296px-Hestem%C3%B8j.jpg',
        category: 'plant'
      });
      const third = Product.create({
        name: 'example3',
        description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
        price: 44.00,
        inventory: 5,
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hestem%C3%B8j.jpg/296px-Hestem%C3%B8j.jpg',
        category: 'animal'
      });

      return Promise.all([first, second, third])
        .then(([firstP, secondP, thirdP]) => {
          p1 = firstP.id;
          p2 = secondP.id;
          p3 = thirdP.id;
        })
    });

    it('returns all users in database', done => {
      request(app)
        .get(`/api/products`)
        .expect(200)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body).to.have.length(3);
          done();
        });
    });

    describe('GET ONE', () => {
      it('gets one specific product', done => {
        request(app)
          .get(`/api/products/${p1}`)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body).to.be.instanceOf(Object);
            expect(res.body.name).to.equal('example1');
            done();
          })
      });
      it('gets one other specific product', done => {
        request(app)
          .get(`/api/products/${p2}`)
          .expect(200)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body).to.be.instanceOf(Object);
            expect(res.body.name).to.equal('example2');
            done();
          })
      });
      it('gets 404 for products not in the database', done => {
        request(app)
          .get(`/api/products/12345667`)
          .expect(404, done);
      });
    });

    describe('POST', () => {
      it('returns new product', done => {
        request(app)
          .post(`/api/products`)
          .send({
            name: 'example4',
            description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
            price: 44.00,
            inventory: 5,
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Hestem%C3%B8j.jpg/296px-Hestem%C3%B8j.jpg',
            category: 'animal'
          })
          .expect(201)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.name).to.equal('example4');
            Product.findById(res.body.id)
              .then(foundProduct => {
                expect(foundProduct).to.not.be.null;
                done();
              })
              .catch(done);
          });
      });
      xit('only admins can create new product', done => {

      });
    });

    describe('PUT', () => {
      it('returns updated product', done => {
        request(app)
          .put(`/api/products/${p1}`)
          .send({name: 'newName'})
          .expect(201)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.body.name).to.equal('newName');
            done();
          })
      });
      xit('only admins can update existing products', done => {

      });
    });

    describe('DELETE', () => {
      it('destroys one product', done => {
        request(app)
          .delete(`/api/products/${p1}`)
          .expect(204, done);
      });
      it('destroyed product is not in the database', done => {
        request(app)
          .get(`/api/products/${p1}`)
          .expect(404)
          .end((err, res) => {
            console.log(res);
            expect(res.body).to.be.null;
            done();
          })
      })
      xit('only admins can destroy products', done => {

      });
    });

  });

});
