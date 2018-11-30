exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes", table => {
    table.increments();
    table.string("name");
    table.string("description");
    table.string("instructions");
    table.integer("timetaken");
    table.integer("rating");
    table.integer("imakeit");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("recipes");
};
