exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("measures")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("measures").insert([
        { id: 1, measure_name: "cup" },
        { id: 2, measure_name: "teaspoon" },
        { id: 3, measure_name: "tablespoon" }
      ]);
    });
};
