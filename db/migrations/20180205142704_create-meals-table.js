
exports.up = function(knex, Promise) {
  let createMealQuery = `CREATE TABLE meals(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    created_at TIMESTAMP
  )`
  return knex.raw(createMealQuery)
};

exports.down = function(knex, Promise) {
  let dropMealQuery = `DROP TABLE meals`
  return knex.raw(dropMealQuery)
};
