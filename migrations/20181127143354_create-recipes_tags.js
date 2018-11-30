exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes_tags", table => {
    table.increments();
    table.integer("recipe_id");
    table.foreign("recipe_id").references("recipes.id");
    table.integer("tag_id").references("tags.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("recipes_tags");
};
