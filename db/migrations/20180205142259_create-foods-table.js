
exports.up = function(knex, Promise) {
  let createFoodQuery = `CREATE TABLE foods(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INTEGER,
    create_at TIMESTAMP,
    updated_at TIMESTAMP
  )`
  return knex.raw(createFoodQuery)
};

exports.down = function(knex, Promise) {
  let dropFoodQuery = `DROP TABLE foods`
  return knex.raw(dropFoodQuery)
};
