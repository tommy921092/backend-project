exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_recipes", table => {
    table.increments();
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.integer("recipe_id");
    table.foreign("recipe_id").references("recipes.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users_recipes");
};
