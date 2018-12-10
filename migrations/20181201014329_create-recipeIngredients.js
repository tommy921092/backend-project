exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes_ingredients", table => {
    table.increments();
    table.integer("recipe_id");
    table.foreign("recipe_id").references("recipes.id");
    table.integer("ingredient_id");
    table.foreign("ingredient_id").references("ingredients.id");
    table.integer("measure_id");
    table.foreign("measure_id").references("measures.id");
    table.decimal("amount");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("recipes_ingredients");
};
