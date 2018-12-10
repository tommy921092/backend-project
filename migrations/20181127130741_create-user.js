exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("username").unique();
    table.string("DisplayName");
    table.string("password");
    table.string("email").unique();
    table.integer("facebookid",100);
    table.integer("googleid",100);
    table.string("accesstoken");
    table.boolean("active");
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
