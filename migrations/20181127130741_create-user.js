exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("username").unique();
    table.string("password");
    table.string("email").unique();
    table.boolean("active");
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
