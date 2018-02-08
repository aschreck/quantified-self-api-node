const chai = require('chai')
const should = chai.should()
const chaiHTTP = require('chai-http')
const server = require('../app.js')

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
// pry = require('pryjs')
// eval(pry.it)

chai.use(chaiHTTP)

describe("api routes", () =>{
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      })
      .done();
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error
      })
      .done()
    })

  describe("GET /api/v1/foods/:id", () => {
    it('should return the food by id', () => {
      return chai.request(server)
      .get("/api/v1/foods/1")
      .then((response) => {
        console.log(response)
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.should.have.property('name')
        response.body.name.should.equal('Vegetables')
        response.body.should.have.property('calories')
        response.body.calories.should.equal(155)
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe("GET /api/v1/meals", () => {
    it('should return all the meal', () => {
      return chai.request(server)
      .get("/api/v1/meals")
      .then((response) => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.should.have.length(4)
        response.body[0].should.have.property('name')
        response.body[0].name.should.equal('breakfast')
        response.body[1].name.should.equal('lunch')
        response.body[2].name.should.equal('dinner')
        response.body[3].name.should.equal('snack')
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe("GET /api/v1/meals/:meal_id/foods", () => {
    it('should return all the meal', () => {
      return chai.request(server)
      .get("/api/v1/meals/1/foods")
      .then((response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body[0].should.have.property('id')
        response.body[0].should.have.property('name')
        response.body[0].name.should.equal('Vegetables')
        response.body[0].should.have.property('calories')
        response.body[0].calories.should.equal(155)
      })
      .catch((error) => {
        throw error
      })
    })
  })

})

