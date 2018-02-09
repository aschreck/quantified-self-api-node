var Food = require('../models/food')

function index(req, res, next) {
  Food.all()
    .then(function(foods) {
      res.status(201).json(foods)
    })
}

function show(req, res, next) {
  let id = req.params.id

  Food.find(id)
    .then(function(food) {
      if (!food) {
        return res.sendStatus(404)
      } else {
        res.json(food)
      }
    })
}

function create(req, res, next) {
  let name = req.body.name
  let calories = req.body.calories

  Food.new(name, calories)
    .then(function(food) {
      res.status(201).json(food)
    })
}

function update(req, res, next) {
  let id = req.params.id
  let name = req.body.name
  let calories = req.body.calories

  Food.edit(id, name, calories)
    .then(function(food) {
      Food.find(id)
        .then(updatedFood => {
          res.json(updatedFood)
        })
    })
}

function destroy(req, res, next) {
  let id = req.params.id
  Food.destroy(id)
    .then(food => {
      return res.sendStatus(200)
    })
}

module.exports = { index, show, create, update, destroy }
