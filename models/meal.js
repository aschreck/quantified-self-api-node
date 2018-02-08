const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var Meal = {
  all: database.raw('SELECT * FROM meals')
  .then(function(meals){
    return meals.rows
  }),

  find: function(id) {
    return database.raw('SELECT * FROM(foods INNER JOIN mealfoods ON foods.id = mealfoods.meal_id) AS t WHERE t.meal_id = 1')
    .then(function (foods) {
     return foods.rows
    })
  },

  new: function(meal_id, food_id) {
    return database.raw('INSERT INTO mealfoods (meal_id, food_id) VALUES (?,?)', [meal_id, food_id])
    .then(function (food) {
      return food.rows
    })
  },

  destroy: function(meal_id, food_id) {
    return database.raw('DELETE FROM mealsfoods WHERE meal_id ? AND food_id = ?', [meal_id, food_id])
    .then(function (food) {
      return food
    })
  }
}

module.exports = Meal