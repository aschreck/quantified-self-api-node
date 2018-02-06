var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/foods', function(req, res, next){
  let id = req.params.id
  database.raw("SELECT * FROM foods)
  .then(function(foods) {
    if (!foods.rows) {
      return res.sendStatus(404)
    } else {
      res.json(foods.rows)
    }
  })
})

router.get('/foods/:id', function(req, res, next){
  database.raw("SELECT * FROM foods WHERE id = ?", [id])
  .then(function(foods) {
    if (!foods.rows) {
      return res.sendStatus(404)
    } else {
      res.json(foods.rows)
    }
  })
})

router.post('/foods', function(req, res, next){
  let name = req.body.name
  let calories = req.body.calories
  database.raw('INSERT INTO foods(name, calories) VALUES (?,?)', [name, calories])
  .then(function(food) {
    return res.json(food.rows)
  })
})

router.delete('/foods/:id', function(req, res, next) {
  let id = req.params.id
  database.raw('DELETE FROM foods WHERE id = ?', [id])
  .then(function(foods) {
    return res.sendStatus(201)
  })
})

router.patch('/foods/:id', function(req, res, next){
  let id = req.params.id
  let name = req.body.name
  let calories = req.body.calories

  database.raw('UPDATE foods SET name = ?, calories = ? WHERE id=?', [name, calories, id])
  .then(function(foods){
    return res.sendStatus(201)
  })
})

router.get('/meals', function(req, res, next){
  database.raw("SELECT * FROM meals")
  //this status is WRONG
  .then(function(food){
    res.status(201).json(food.rows)
  })
})

router.get('/meals/:id/foods', function(req, res, next){
  let id = req.params.id

  database.raw("SELECT * FROM meals WHERE id = ?", [id])
  .then(function(foods) {
    if (!foods.rows) {
      return res.sendStatus(404)
    } else {
      res.json(foods.rows)
    }
  })
})

router.post('/meals/:meal_id/foods/:id', function(req, res, next){
  let meal_id = req.params.meal_id
  let food_id = req.params.id
  database.raw('INSERT INTO mealfoods (meal_id, food_id) VALUES (?,?)', [meal_id, food_id])
  .then(function(food){
    res.status(201).json(food.rows)
  })
})

router.delete('/meals/:meal_id/foods/:id', function(req, res, next){
  let meal_id = req.params.meal_id
  let food_id = req.params.id
  database.raw('DELETE FROM mealfoods WHERE meal_id = ? AND food_id = ?', [meal_id, food_id])
  .then(function(food){
    res.status(201).json(food.rows)
  })
})


module.exports = router