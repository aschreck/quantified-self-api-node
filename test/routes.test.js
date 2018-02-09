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

describe("api routes", () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      })
    .done()
  })

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
    it('should return all the foods attached to the meal', () => {
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

  describe("GET /api/v1/foods", () => {
    it("should return all the foods", () => {
      return chai.request(server)
      .get("/api/v1/foods")
      .then((response) => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.should.have.lengthOf(4)
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe("POST /api/v1/foods", () => {
    it('should create a food', () => {
      return chai.request(server)
      .post('/api/v1/foods')
      .send({"name": "Cheese", "calories": 123})
      .then((response) => {
        response.should.have.status(201)
        response.body.should.be.a('array')
        response.body[0].should.have.property('id')
        response.body[0].should.have.property('name')
        response.body[0].should.have.property('calories')
        response.body[0].name.should.equal('Cheese')
        response.body[0].calories.should.equal(123)
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe("POST /api/v1/meals/:meal_id/foods/:id", () => {
    it('should add a food to a meal', () => {
      return chai.request(server)
      .post('/api/v1/meals/1/foods/1')
      .send({"id": 1, "name": "bagel", "calories": "50", "food_id": 1, "meal_id": 1})
      .then((response) => {
        response.should.have.status(201)
      })
      return chai.request(sever)
      .get('/api/v1/meals/1/foods')
      .then((response) => {
        response.should.have.status(201)
        response.body.should.be.a('array')
        response.body[1].should.have.property('id')
        response.body[1].should.have.property('food_id')
        response.body[1].should.have.property('meal_id')
        response.body[1].name.should.equal('bagel')
        response.body[1].name.should.equal(50)
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe("DELETE /api/v1/foods/:id", () => {
    it('should delete a food', () => {
      return chai.request(server)
      .delete('/api/v1/foods/1')
      .then((response) => {
        response.should.have.status(200)
      })
      return chai.request(server)
      .get('/api/v1/foods')
      .then((response) => {
        expect(response.body[0].name).to.equal('')
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe("DELETE /api/v1/meals/:meal_id/food/:id", () => {
    it('should delete the food from the meal', () => {
      return chai.request(server)
      .delete('/api/v1/meals/1/foods/1')
      return chai.request(server)
      .get('api/v1/meals/1/foods')
      .then((response) => {
        expect(reponse.body[0].name).to.equal('')
      })
      .catch((error) => {
        throw error
      })
    })
  })

  describe("PATCH /api/v1/foods/:id", () => {
    it('should update existing food', () => {
      return chai.request(server)
      .patch('/api/v1/foods/1')
      .send({ "id": 1, "name": "Cheese", "calories": 100 })
      .then((response) => {
        response.body.name.should.equal('Cheese')
        response.body.calories.should.equal(100)
      })
      .catch((error) => {
        throw error
      })
    })
  })
})
