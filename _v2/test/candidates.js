/* eslint-disable import/no-extraneous-dependencies */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const Candidate = require('../models/account-candidate');

chai.should();
chai.use(chaiHttp);

describe('Test /candidates API', () => {
  const createdCandidates = [];

  after((done) => {
    createdCandidates.forEach(id => Candidate.findByIdAndDelete(id).exec());
    done();
  });

  describe('GET /candidates', () => {
    it('should get all candidates', (done) => {
      chai.request(server)
        .get('/candidates')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(271);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('candidates');
          res.body.candidates.should.be.a('array');
          res.body.candidates.forEach((candidate) => {
            candidate.should.be.a('object');
            candidate.should.have.property('_id');
            candidate.should.have.property('_slug');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /candidates?{condition=value}', () => {
    it('should get candidates filtered by conditions', (done) => {
      chai.request(server)
        .get('/candidates?industry=ban-hang&location=ha-noi')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(22);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('candidates');
          res.body.candidates.should.be.a('array');
          res.body.candidates.forEach((candidate) => {
            candidate.should.be.a('object');
            candidate.should.have.property('_id');
            candidate.should.have.property('_slug');
            candidate.should.have.property('industries').include('Bán hàng');
            candidate.should.have.property('location');
            candidate.location.should.be.a('object');
            candidate.location.should.have.property('work_locations').include('Hà Nội');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /candidates?fields={selected fields}', () => {
    it('should get candidates with selected fields', (done) => {
      chai.request(server)
        .get('/candidates?fields=name.full,date_of_birth')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(271);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('candidates');
          res.body.candidates.should.be.a('array');
          res.body.candidates.forEach((candidate) => {
            candidate.should.be.a('object');
            candidate.should.have.all.keys('_id', '_slug', 'name', 'date_of_birth');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /candidates?sort={sort fields}', () => {
    it('should get candidates sorted by fields', (done) => {
      chai.request(server)
        .get('/candidates?sort=-date_of_birth&fields=date_of_birth_raw')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(271);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('candidates');
          res.body.candidates.should.be.a('array');

          const datesOfBirth = [];
          res.body.candidates.forEach((candidate) => {
            candidate.should.be.a('object');
            candidate.should.have.property('_id');
            candidate.should.have.property('_slug');
            datesOfBirth.push(candidate.date_of_birth_raw);
          });

          for (let i = 0; i < datesOfBirth.length - 1; i += 1) {
            new Date(datesOfBirth[i]).should.be.above(new Date(datesOfBirth[i + 1]));
          }
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /candidates?page={page number}&size={results per page}', () => {
    it('should get paginated candidates', (done) => {
      chai.request(server)
        .get('/candidates?page=2&size=5')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(271);
          res.body.should.have.property('_page').eql(2);
          res.body.should.have.property('_size').eql(5);
          res.body.should.have.property('candidates');
          res.body.candidates.should.be.a('array');
          res.body.candidates.forEach((candidate) => {
            candidate.should.be.a('object');
            candidate.should.have.property('_id');
            candidate.should.have.property('_slug');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /candidates/:id', () => {
    it('should get a candidate by id', (done) => {
      chai.request(server)
        .get('/candidates/5b9612d9a1d4841ef5a598a9')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('candidate');
          res.body.candidate.should.be.a('object');
          res.body.candidate.should.have.all.keys([
            '_id',
            '_slug',
            'name',
            'gender',
            'date_of_birth',
            'location',
            'job_title',
            'industries',
            'desire',
            'job_goals',
            'qualification',
            'work_experience',
            'skills',
            'foreign_languages',
            '_views',
            '_photos',
            '_external_files',
            '_created_at',
            '_updated_at',
          ]);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /candidates/:slug', () => {
    it('should get a candidate by slug', (done) => {
      chai.request(server)
        .get('/candidates/vtbngoc')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('candidate');
          res.body.candidate.should.be.a('object');
          res.body.candidate.should.have.all.keys([
            '_id',
            '_slug',
            'name',
            'gender',
            'date_of_birth',
            'location',
            'job_title',
            'industries',
            'desire',
            'job_goals',
            'qualification',
            'work_experience',
            'skills',
            'foreign_languages',
            '_views',
            '_photos',
            '_external_files',
            '_created_at',
            '_updated_at',
          ]);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('POST /candidates', () => {
    it('should create a candidate', (done) => {
      chai.request(server)
        .post('/candidates')
        .set('Content-Type', 'application/json')
        .send({
          phone_number: '0987654321',
          password: 'abc123456',
        })
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('candidate');
          res.body.candidate.should.be.a('object');

          createdCandidates.push(res.body.candidate._id);

          Candidate.findById(res.body.candidate._id)
            .select('phone_number.value')
            .then((candidate) => {
              candidate.should.be.a('object');
              candidate.should.have.property('phone_number');
              candidate.phone_number.should.be.a('object');
              candidate.phone_number.should.have.property('value').eql('0987654321');
              done();
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });
  });
});
