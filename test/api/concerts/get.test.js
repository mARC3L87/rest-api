const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET/api/concerts', () => {
  before(async () => {
    const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Smith', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConOne.save();
    const testConTwo = new Concert({  _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Jane Smith', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConTwo.save();
  });

  it('should return concert performer', async () => {
    const res = await request(server).get('api/concerts/performer/John Smith');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

  // after(async () => {
  //   await Concert.deleteMany();
  // });
});