class RecipeService {
  constructor(knex) {
    this.knex = knex;
  }

  async listBySearch(keyword) {
    //NEED FIX-------search if the keyword exist in any field of the row, if yes then list it
    try {
      let query = await this.knex("recipes")
        .select(
          "recipes.id",
          "recipes.name",
          "recipes.description",
          "users.username",
          "recipes.time_taken",
          "tags.name"
        )
        .innerJoin("users", "recipes.user_id", "users.id");
      //NEED FIX-------.where to_tsvector('english', body) @@ to_tsquery('english', 'friend');
      return query;
    } catch (e) {
      console.log(e);
    }
  }

  async listAllTag(tag) {
    //NEED FIX-------tested but only work for one tag, trying to querystring multiple tags=>object input this function
    try {
      let query = await this.knex("recipes")
        .select(
          "recipes.id",
          "recipes.recipe_name",
          "recipes.description",
          "users.username",
          "recipes.time_taken",
          "tags.tagname"
        )
        .innerJoin("users", "recipes.user_id", "users.id")
        .innerJoin("recipes_tags", "recipes_tags.recipe_id", "recipes.id")
        .innerJoin("tags", "recipes_tags.tag_id", "tags.id")
        .where("tags.tagname", tag);
    } catch (e) {
      console.log(e);
    }
  }

  async showDetails(recipeID) {
    //tested
    try {
      let query = await this.knex("recipes").where("recipes.id", recipeID);
      return query;
    } catch (e) {
      console.log(e);
    }
  }

  async save(recipeID, user) {
    //tested
    try {
      let query = await this.knex("users")
        .select("id")
        .where("users.username", user)
        .first();
      return this.knex
        .insert({
          user_id: query.id,
          recipe_id: recipeID
        })
        .into("users_recipes");
    } catch (e) {
      console.log(e);
    }
  }

  async Rate(recipeID, user, rating) {
    //tested
    try {
      let query = await this.knex("users")
        .select("id")
        .where("users.username", user)
        .first();
      await this.knex("users_recipes")
        .update("rating", rating)
        .where({ user_id: query.id, recipe_id: recipeID });
      let average = await this.knex("recipes")
        .avg("rating")
        .where("recipe_id", recipeID)
        .first();
      return await this.knex("recipes")
        .update("rating", average.avg)
        .where("recipes.id", recipeID);
    } catch (e) {
      console.log(e);
    }
  }

  async listBySave(user) {
    //tested
    try {
      return await this.knex("recipes")
        .select(
          "recipes.id",
          "recipes.recipe_name",
          "recipes.description",
          "users.username",
          "recipes.time_taken"
        )
        .innerJoin("users_recipes", "users_recipes.recipe_id", "recipes.id")
        .innerJoin("users", "users.id", "users_recipes.user_id")
        .where("users.username", user);
    } catch (e) {
      console.log(e);
    }
  }
}
