const request = require('supertest')
    , {expect} = require('chai')
    , db = require('APP/db')
    , app = require('./start');

describe('/api/reviews', () => {

  const Review = db.Review;

  before('Await database sync', () => db.didSync);
  after('Clear the tables', () => db.truncate({ cascade: true }));

  let r1 = '';
  let r2 = '';
  let r3 = '';

  before('Dummy Data', () => {
  	const first = Review.create({
  		title: 'first',
  		content: 'greatgreatgreatgreatgreatgreatgreatgreatgreatgreatgreatgreata',
  		rating: 5
  	});
  	const second = Review.create({
  		title: 'second', 
  		content: 'okokokokokokokokokokokokokokokokokokokokokokokokokokokokokoka',
  		rating: 3
  	});
  	const third = Review.create({
  		title: 'third',
  		content: 'badbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbadbads',
  		rating: 1
  	});

  	return Promise.all([first, second, third])
  		.then(([firstR, secondR, thirdR]) => {
  			r1 = firstR.id;
        r2 = secondR.id;
        r3 = thirdR.id;
  		})
      .catch();
  });

  // GET ONE
  describe('gets specific reviews', () => {
    it('gets one specific review', done => {
      request(app)
        .get(`/api/reviews/${r1}`)
        .expect(200)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.instanceOf(Object);
          expect(res.body.title).to.equal('first');
          done();
        })
    });
    it('gets one other specific review', done => {
      request(app)
        .get(`/api/reviews/${r2}`)
        .expect(200)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.instanceOf(Object);
          expect(res.body.title).to.equal('second');
          done();
        })
    });
    it('gets 404 for non-existent reviews', done => {
      request(app)
        .get(`/api/reviews/12345566`)
        .expect(404, done);
    });
  });

  // POST ONE
  describe('creates new review', () => {
    it('returns new review', done => {
      request(app)
        .post(`/api/reviews`)
        .send({
          title: 'fourth',
          content: 'terrible!!!terrible!!!terrible!!!terrible!!!terrible!!!terrible!!!',
          rating: 1
        })
        .expect(201)
        .end( (err, res) => {
          if(err) return done(err);
          expect(res.body.title).to.equal('fourth');
          Review.findById(res.body.id)
            .then( user => {
              expect(user).to.not.be.null;
              done();
            })
            .catch(done);
        })
    });
    xit('only authenticated users can create reviews', () => {

    });
  });

  // UPDATE ONE
  describe('updates review', () => {
    it('updates one review', done => {
      request(app)
        .put(`/api/reviews/${r1}`)
        .send({title: 'really great'})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.title).to.equal('really great');
          done();
        });
    });
    xit('only authenticated users can update reviews', done => {

    });
  });

  // DESTROY ONE
  describe('destroys review', () => {
    it('destroys one review', done => {
      request(app)
        .delete(`/api/reviews/${r1}`)
        .expect(204, done);
    });
    xit('only authenticated users can destroy reviews', done => {

    });
  });
});
