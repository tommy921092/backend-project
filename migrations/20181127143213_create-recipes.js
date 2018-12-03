exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes", table => {
    table.increments();
    table.string("recipe_name");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.string("image");
    table.string("description");
    table.string("instructions");
    table.integer("time_taken");
    table.integer("rating");
    table.integer("imakeit");
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("recipes");
};
