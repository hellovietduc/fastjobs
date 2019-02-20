/* eslint-disable import/no-extraneous-dependencies */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');

chai.should();
chai.use(chaiHttp);

describe('Test /jobs API', () => {
  describe('GET /jobs', () => {
    it('should get all jobs', (done) => {
      chai.request(server)
        .get('/jobs')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(329);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('jobs');
          res.body.jobs.should.be.a('array');
          res.body.jobs.forEach((job) => {
            job.should.be.a('object');
            job.should.have.property('_id');
            job.should.have.property('_slug');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /jobs?{condition=value}', () => {
    it('should get jobs filtered by conditions', (done) => {
      chai.request(server)
        .get('/jobs?industry=ban-hang&location=ha-noi')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(33);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('jobs');
          res.body.jobs.should.be.a('array');
          res.body.jobs.forEach((job) => {
            job.should.be.a('object');
            job.should.have.property('_id');
            job.should.have.property('_slug');
            job.should.have.property('industries').include('Bán hàng');
            job.should.have.property('locations').include('Hà Nội');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /jobs?fields={selected fields}', () => {
    it('should get jobs with selected fields', (done) => {
      chai.request(server)
        .get('/jobs?fields=title,industries')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(329);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('jobs');
          res.body.jobs.should.be.a('array');
          res.body.jobs.forEach((job) => {
            job.should.be.a('object');
            job.should.have.all.keys('_id', '_slug', 'title', 'industries');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /jobs?sort={sort fields}', () => {
    it('should get jobs sorted by fields', (done) => {
      chai.request(server)
        .get('/jobs?sort=-salary&fields=salary.max')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(329);
          res.body.should.have.property('_page').eql(1);
          res.body.should.have.property('_size').eql(10);
          res.body.should.have.property('jobs');
          res.body.jobs.should.be.a('array');

          const salaries = [];
          res.body.jobs.forEach((job) => {
            job.should.be.a('object');
            job.should.have.property('_id');
            job.should.have.property('_slug');
            salaries.push(job.salary.max);
          });

          salaries.should.have.ordered.members([30, 30, 30, 30, 30, 30, 28, 25, 24, 22]);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /jobs?page={page number}&size={results per page}', () => {
    it('should get paginated jobs', (done) => {
      chai.request(server)
        .get('/jobs?page=2&size=5')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(329);
          res.body.should.have.property('_page').eql(2);
          res.body.should.have.property('_size').eql(5);
          res.body.should.have.property('jobs');
          res.body.jobs.should.be.a('array');
          res.body.jobs.forEach((job) => {
            job.should.be.a('object');
            job.should.have.property('_id');
            job.should.have.property('_slug');
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /jobs/_map?coords={lng, lat}&radius={radius}', () => {
    it('should get jobs within area', (done) => {
      chai.request(server)
        .get('/jobs/_map?coords=105.7809735,21.0177304&radius=5')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_total').eql(70);
          res.body.should.have.property('_lng').eql(105.7809735);
          res.body.should.have.property('_lat').eql(21.0177304);
          res.body.should.have.property('_radius').eql(5);
          res.body.should.have.property('jobs');
          res.body.jobs.should.be.a('array');
          res.body.jobs.forEach((job) => {
            job.should.be.a('object');
            job.should.have.all.keys([
              '_id',
              '_slug',
              'title',
              'locations',
              'salary',
              'deadline',
              'employer',
              'geo_location',
            ]);
          });
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /jobs/:id', () => {
    it('should get a job by id', (done) => {
      chai.request(server)
        .get('/jobs/5b95ebe173b25010e12770f2')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('job');
          res.body.job.should.be.a('object');
          res.body.job.should.have.all.keys([
            '_id',
            '_slug',
            'title',
            'industries',
            'locations',
            'salary',
            'work_type',
            'position',
            'quantity',
            'deadline',
            'description',
            'benefit',
            'requirements',
            'contact_info',
            'employer',
            'geo_location',
            '_views',
            '_created_at',
            '_updated_at',
          ]);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET /jobs/:slug', () => {
    it('should get a job by slug', (done) => {
      chai.request(server)
        .get('/jobs/nhan-vien-kinh-doanh')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('job');
          res.body.job.should.be.a('object');
          res.body.job.should.have.all.keys([
            '_id',
            '_slug',
            'title',
            'industries',
            'locations',
            'salary',
            'work_type',
            'position',
            'quantity',
            'deadline',
            'description',
            'benefit',
            'requirements',
            'contact_info',
            'employer',
            'geo_location',
            '_views',
            '_created_at',
            '_updated_at',
          ]);
          done();
        })
        .catch(err => done(err));
    });
  });
});
