const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

//problem: we need to build the json response so that it also has the meals associated with it.
var Meal = {

  all: function() {
    database.raw('SELECT * FROM meals')
    .then(function(meals) {
    return Promise.all(
      meals.rows.map(function(meal){
        return database.raw('SELECT * FROM foods WHERE id=?', [meal.id])
        .then(function(foods) {
          return mealWithFoods = {id: meal.id, name: meal.name, foods: foods.rows}
        })
      })
    )
    .then(function(allmeals) {
      return allmeals
    })
  })
},
  //construct an array of promises. For each item in row, create a promise

  find: function (id) {
    return database.raw('SELECT * FROM(foods INNER JOIN mealfoods ON foods.id = mealfoods.meal_id) AS t WHERE t.meal_id = 1')
    .then(function (foods) {
     return foods.rows
    })
  },

  new: function (meal_id, food_id) {
    return database.raw('INSERT INTO mealfoods (meal_id, food_id) VALUES (?,?)', [meal_id, food_id])
    .then(function (food) {
      return food.rows
    })
  },

  destroy: function (meal_id, food_id) {
    return database.raw('DELETE FROM mealfoods WHERE meal_id = ? AND food_id = ?', [meal_id, food_id])
  }
}

module.exports = Meal
