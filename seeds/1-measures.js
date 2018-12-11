exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("measures")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("measures").insert([
        { measure_name: "cup" },
        { measure_name: "teaspoon" },
        { measure_name: "tablespoon" },
        { measure_name: "package" },
        { measure_name: "bag" },
        { measure_name: "tablespoons" },
        { measure_name: "" }
      ]);
    });
};
