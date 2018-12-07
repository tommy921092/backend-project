exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        { content: "bad taste", user_id: 1, recipe_id: 1 },
        { content: "yummy", user_id: 2, recipe_id: 1 },
        { content: "very delicious and juicy", user_id: 2, recipe_id: 3 }
      ]);
    });
};
