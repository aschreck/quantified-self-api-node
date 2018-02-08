
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return knex('foods').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        { name: 'Vegetables', calories: 155 },
        { name: 'Meat', calories: 299 },
        { name: 'irradiated meatloaf', calories: 567 },
        { name: 'sludge duritos', calories: 900 }
      ]);
    })
    .then(function () {
      return knex('meals').truncate()
        .then(function () {
          return knex('meals').insert([
            { name: 'breakfast' },
            { name: 'lunch' },
            { name: 'dinner' },
            { name: 'snack' },
          ])
        })
    })
    .then(function () {
      return knex('mealfoods').truncate()
        .then(function () {
          return knex('mealfoods').insert([
            { food_id: 1, meal_id: 1 },
            { food_id: 2, meal_id: 2 },
            { food_id: 3, meal_id: 3 },
            { food_id: 4, meal_id: 4 },
          ])
        })
    })
};
