const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var Meal = {

  all: function () {
    return database.raw('SELECT * FROM meals;')
      .then((meals) => {
        return Promise.all(
          meals.rows.map(function (meal) {
            let id = meal.id
            return database.raw('SELECT meals.id, meals.name, foods.* from meals join mealfoods ON meals.id = mealfoods.meal_id join foods on foods.id = mealfoods.food_id WHERE meals.id = ?;', [id])
              .then(foods => {
                let mealWithFoods = { id: meal.id, name: meal.name, foods: foods.rows }
                return mealWithFoods
              })
          })
        )
          .then(allmeals => {
            return allmeals
          })
      })
  },

  find: function (mealId) {
    return database.raw(`SELECT foods.id, foods.name, foods.calories FROM foods
      INNER JOIN mealfoods on foods.id=mealfoods.food_id
      WHERE mealfoods.meal_id=?`, [mealId])
      .then(function (foods) {
        return foods.rows
      })
  },

  new: function (mealId, foodId) {
    return database.raw('INSERT INTO mealfoods (meal, food) VALUES (?,?) RETURNING *',
      [mealId, foodId])
      .then(function (meal) {
        return meal.rows[0]
      })
  },

  destroy: function (mealId, foodId) {
    return database.raw('DELETE FROM mealfoods WHERE mealfoods.meal_id = ? AND mealfoods.food_id =?', [mealId, foodId])
  }
}

module.exports = Meal;