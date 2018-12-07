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
          description: "good apple pie",
          time_taken: 30
        },
        {
          recipe_name: "ice cream",
          user_id: 2,
          description: "good ice cream",
          time_taken: 50
        },
        {
          recipe_name: "steak",
          user_id: 2,
          description: "juicy steak",
          time_taken: 30
        }
      ]);
    });
};
