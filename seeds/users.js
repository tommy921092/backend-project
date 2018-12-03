exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "tommy",
          password: "tommy",
          email: "tommy@tommy.com"
        },
        {
          id: 2,
          username: "peter",
          password: "peter",
          email: "peter@peter.com"
        }
      ]);
    });
};
