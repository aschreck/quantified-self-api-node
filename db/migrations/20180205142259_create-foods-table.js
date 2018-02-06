
exports.up = function(knex, Promise) {
  let createFoodQuery = `CREATE TABLE foods(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT,
    calories INTEGER,
    created_at TIMESTAMP default current_timestamp,
    updated_at TIMESTAMP default current_timestamp

  )`
  return knex.raw(createFoodQuery)
};

exports.down = function(knex, Promise) {
  let dropFoodQuery = `DROP TABLE foods`
  return knex.raw(dropFoodQuery)
};
