exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return (
    knex("tags")
      .del()
      .then(function() {
        // Inserts seed entries
        return knex("tags").insert([
          { id: 1, tagname: "dessert" },
          { id: 2, tagname: "breakfast" },
          { id: 3, tagname: "lunch" },
          { id: 4, tagname: "dinner" },
          { id: 5, tagname: "vegan" }
        ]);
      })
  );
};
