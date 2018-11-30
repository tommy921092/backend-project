
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('measures').del()
    .then(function () {
      // Inserts seed entries
      return knex('measures').insert([
        {id: 1, name: 'cup'},
        {id: 2, name: 'teaspoon'},
        {id: 3, name: 'tablespoon'}
      ]);
    });
};
