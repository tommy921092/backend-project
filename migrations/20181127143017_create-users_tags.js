exports.up = function(knex, Promise) {
  return knex.schema.createTable("users_tags", table => {
    table.increments();
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.integer("tag_id");
    table.foreign("tag_id").references("tags.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users_tags");
};
