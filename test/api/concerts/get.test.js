const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('Concerts', () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  });
  describe('GET /api/concerts', () => {
    before(async () => {
      const testConOne = new Concert({ performer: 'JohnSmith', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
      await testConOne.save();
      const testConTwo = new Concert({ performer: 'JaneSmith', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
      await testConTwo.save();
    });

    it('should return concert performer', async () => {
      const res = await request(server).get('/api/concerts/performer/JohnSmith');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(1);
    });

    it('should return concert genre', async () => {
      const res = await request(server).get('/api/concerts/genre/Rock');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(1);
    });

    it('should return concert price', async () => {
      const res = await request(server).get('/api/concerts/price/30/50');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(1);
    });

    it('should return concerts day', async () => {
      const res = await request(server).get('/api/concerts/price/day/1');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;
      expect(res.body.length).to.be.equal(2);
    });

  });
});