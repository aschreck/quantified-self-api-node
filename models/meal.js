const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var Meal = {

  all: function () {
    return database.raw('SELECT m.*, json_agg(f.*) AS foods FROM meals m INNER JOIN mealfoods mf ON m.id = mf.meal_id INNER JOIN foods f ON mf.food_id = f.id GROUP BY m.id')
    .then(function(mealfoods){
      pry = require('pryjs')
      eval(pry.it)
      return mealfoods.rows
    })
  },

  find: function (id) {
    return database.raw("SELECT foods.id, foods.name, foods.calories FROM (foods INNER JOIN mealfoods on foods.id=mealfoods.food_id) WHERE mealfoods.meal_id=?", [id])
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
