var Meal = require('../models/meal')

function index(req, res, next) {
  Meal.all()
    .then(function (meals) {
      res.status(201).json(meals)
    })
}

function show(req, res, next) {
  let id = req.params.id

  Meal.find(id)
  .then(function (foods) {
    if (!foods) {
      return res.sendStatus(404)
    } else {
      res.json(foods)
    }
  })
}

function create(req, res, next) {
  let meal_id = req.params.meal_id
  let food_id = req.params.id
  Meal.new(meal_id, food_id)
  .then(function (food) {
    res.status(201).json(food.rows)
  })
}

function destroy(req, res, next) {
  let meal_id = req.params.meal_id
  let food_id = req.params.id
  Meal.destroy(meal_id, food_id)
  .then(function (food) {
    res.status(201).json(food.rows)
  })
}

module.exports = { index, show, create, destroy }
