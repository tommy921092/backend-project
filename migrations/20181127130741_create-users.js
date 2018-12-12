exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("username").unique();
    table.string("DisplayName");
    table.string("password");
    table.string("email").unique();
    table.string("facebookid",255);
    table.string("googleid",255);
    table.string("accesstoken",255);
    table.string('profilepicture',255)
    table.boolean("active");
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
