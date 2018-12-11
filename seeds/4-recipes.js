exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          recipe_name: "apple pie",
          user_id: 1,
          time_taken: 30
        },
        {
          recipe_name: "ice cream",
          user_id: 2,
          time_taken: 50
        },
        {
          recipe_name: "steak",
          user_id: 2,
          time_taken: 30
        }
      ]);
    });
};
