exports.up = function(knex, Promise) {
  return knex.schema.createTable("measures", table => {
    table.increments();
    table.string("measure_name").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("measures");
};
