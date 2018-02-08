const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var Food = {
  all: database.raw('SELECT * FROM foods')
    .then(function(foods) {
      return foods.rows
    }),

  new: function (name, calories) {
    return database.raw('INSERT INTO foods (name, calories) VALUES (?,?) RETURNING *', [name, calories])
      .then(function (food) {
        return food.rows
      })
  },

  find: function (id) {
    return database.raw('SELECT * FROM foods WHERE id = ?', [id])
      .then(function (food) {
        // pry = require('pryjs')
        // eval(pry.it)
        return food.rows[0]
      })
  },

  edit: function (id, name, calories) {
    return database.raw('UPDATE foods SET name = ?, calories = ? WHERE id = ?', [name, calories, id])
      .then(function (food) {
        return food
      })
  },

  destroy: function (id) {
    return database.raw('DELETE FROM foods WHERE id = ?', [id])
      .then(function (food) {
        return food
      })
  }
}

module.exports = Food
