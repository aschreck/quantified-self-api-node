
exports.up = function(knex, Promise) {
  let createMealFoodsTable = `CREATE TABLE mealfoods(
    id SERIAL PRIMARY KEY NOT NULL,
    food_id int,
    meal_id int,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
  )`
  return knex.raw(createMealFoodsTable)
};

exports.down = function(knex, Promise) {
  let dropMealFoodsTable = `DROP TABLE mealfoods`
  return knex.raw(dropMealFoodsTable)
};
