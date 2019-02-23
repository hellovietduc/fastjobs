/* eslint-disable import/no-extraneous-dependencies */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const Employer = require('../models/account-employer');

chai.should();
chai.use(chaiHttp);

describe('Test /employers API', () => {
  const createdEmployers = [];

  after((done) => {
    createdEmployers.forEach(id => Employer.findByIdAndDelete(id).exec());
    done();
  });

  describe('GET /employers', () => {
    it('should get all employers', (done) => {
      chai.request(server)
        .get('/employers')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(309);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('employers');
          res.body.employers.should.be.a('array');
          res.body.employers.forEach((employer) => {
            employer.should.be.a('object');
            employer.should.have.property('_id');
            employer.should.have.property('_slug');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /employers?{condition=value}', () => {
    it('should get employers filtered by conditions', (done) => {
      chai.request(server)
        .get('/employers?location=ha-noi')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(131);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('employers');
          res.body.employers.should.be.a('array');
          res.body.employers.forEach((employer) => {
            employer.should.be.a('object');
            employer.should.have.property('_id');
            employer.should.have.property('_slug');
            employer.should.have.property('company_info');
            employer.company_info.should.be.a('object');
            employer.company_info.should.have.property('city').include('Hà Nội');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /employers?fields={selected fields}', () => {
    it('should get employers with selected fields', (done) => {
      chai.request(server)
        .get('/employers?fields=company_info')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(309);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('employers');
          res.body.employers.should.be.a('array');
          res.body.employers.forEach((employer) => {
            employer.should.be.a('object');
            employer.should.have.all.keys('_id', '_slug', 'company_info');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /employers?sort={sort fields}', () => {
    it('should get employers sorted by fields', (done) => {
      chai.request(server)
        .get('/employers?sort=last_update')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(309);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('employers');
          res.body.employers.should.be.a('array');

          const updatedDates = [];
          res.body.employers.forEach((employer) => {
            employer.should.be.a('object');
            employer.should.have.property('_id');
            employer.should.have.property('_slug');
            updatedDates.push(employer._updated_at);
          });

          for (let i = 0; i < updatedDates.length - 1; i += 1) {
            new Date(updatedDates[i]).should.be.above(new Date(updatedDates[i + 1]));
          }
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /employers?page={page number}&size={results per page}', () => {
    it('should get paginated employers', (done) => {
      chai.request(server)
        .get('/employers?page=2&size=5')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(309);
          res.body.should.have.property('_page').eql(2);
          res.body.should.have.property('_size').eql(5);
          res.body.should.have.property('employers');
          res.body.employers.should.be.a('array');
          res.body.employers.forEach((employer) => {
            employer.should.be.a('object');
            employer.should.have.property('_id');
            employer.should.have.property('_slug');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /employers/:id', () => {
    it('should get an employer by id', (done) => {
      chai.request(server)
        .get('/employers/5b616be498e42b5024344faa')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('employer');
          res.body.employer.should.be.a('object');
          res.body.employer.should.have.all.keys([
            '_id',
            '_slug',
            'company_info',
            'contact_info',
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

  describe('GET /employers/:slug', () => {
    it('should get an employer by slug', (done) => {
      chai.request(server)
        .get('/employers/cong-ty-tnhh-cong-nghe-polaris')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('employer');
          res.body.employer.should.be.a('object');
          res.body.employer.should.have.all.keys([
            '_id',
            '_slug',
            'company_info',
            'contact_info',
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

  describe('POST /employers', () => {
    it('should create an employer', (done) => {
      chai.request(server)
        .post('/employers')
        .set('Content-Type', 'application/json')
        .send({
          email: 'abc@gmail.com',
          password: 'abc123456',
        })
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('employer');
          res.body.employer.should.be.a('object');

          createdEmployers.push(res.body.employer._id);

          Employer.findById(res.body.employer._id)
            .select('email.value')
            .then((employer) => {
              employer.should.be.a('object');
              employer.should.have.property('email');
              employer.email.should.be.a('object');
              employer.email.should.have.property('value').eql('abc@gmail.com');
              done();
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });
  });
});
