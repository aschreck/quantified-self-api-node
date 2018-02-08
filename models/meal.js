const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var Meal = {
  all: database.raw('SELECT * FROM meals')
  .then(function(meals){
    return meals.rows
  }),

  find: function(id) {
    database.raw('SELECT * FROM meals where id = ?', [id])
    .then(function (foods) {
     return foods.rows
    })
  },

  new: function(meal_id, food_id) {
    databse.raw('INSERT INTO mealfoods (meal_id, food_id) VALUES (?,?)', [meal_id, food_id])
    .then(function (food) {
      return food.rows
    })
  },

  destroy: function(meal_id, food_id) {
    database.raw('DELETE FROM mealsfoods WHERE meal_id ? AND food_id = ?', [meal_id, food_id])
    .then(function (food) {
      return food
    })
  }
}

module.exports = Meal