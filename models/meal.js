const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var Meal = {

  all: function () {
    return database.raw('SELECT meals.*, row_to_json(f.*) as foods FROM meals INNER JOIN foods f USING(id)')
    .then(function(mealfoods){
      return mealfoods.rows
    })
    // return database.raw('SELECT * FROM meals')
    //   .then((meals) => {
    //     return Promise.all(
    //       meals.rows.map(function (meal) {
    //         let id = meal.id
    //         // return database.raw('SELECT meals.id, meals.name, foods.* from meals join mealfoods ON meals.id = mealfoods.meal_id join foods on foods.id = mealfoods.food_id WHERE meals.id = ?;', [id])
    //         return database.raw('SELECT meals.*, row_to_json(f.*) as foodmeal FROM meals INNER JOIN foods f USING(id);')
    //           .then(foods => {
    //             let mealWithFoods = { id: meal.id, name: meal.name, foods: foods.rows }
    //             return mealWithFoods
    //           })
    //       })
    //     )
    //       .then(allmeals => {
    //         return allmeals
    //       })
    //   })
  },

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
