class RecipeService {
  constructor(knex) {
    this.knex = knex;
  }
  async listByName(keyword) {
    try {
      let query = await this.knex("recipes")
        .select(
          "recipes.id",
          "recipes.recipe_name",
          "recipes.description",
          "users.username",
          "recipes.time_taken"
        )
        .innerJoin("users", "recipes.user_id", "users.id")
        .where("recipes.recipe_name", "like", keyword);
      console.log(query);
      return query;
    } catch (e) {
      console.log(e);
    }
  }
  async listByTags(tags) {
    //tested
    try {
      let Arr = tags.split(",");
      console.log(Arr);
      let query = await this.knex("recipes")
        .select(
          "recipes.id as recipeID",
          "recipes.recipe_name",
          "recipes.description",
          "users.username",
          "recipes.time_taken",
          this.knex.raw("ARRAY_AGG(tags.tagname) as tags")
        )
        .innerJoin("users", "recipes.user_id", "users.id")
        .innerJoin("recipes_tags", "recipes_tags.recipe_id", "recipes.id")
        .innerJoin("tags", "recipes_tags.tag_id", "tags.id")
        .whereIn("tags.tagname", Arr)
        .groupBy("recipes.id", "users.username"); //{...tags: ['dessert','vegan']}
      console.log(query);
      return query;
    } catch (e) {
      console.log(e);
    }
  }

  async showDetails(recipeID) {
    //tested
    try {
      let query = await this.knex("recipes").where("recipes.id", recipeID);
      console.log(query);
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

  async rate(recipeID, user, rating) {
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

  async addRecipe(user, content) {
    try {
      let query = await this.knex("users")
        .select("id")
        .where("users.username", user)
        .first();
      await this.knex("recipes")
        .insert({
          recipe_name: content.name,
          user_id: query.id,
          imageurl: content.url,
          description: content.description,
          instructions: content.instructions,
          time_taken: content.time_taken,
          rating: content.rating,
          imakeit: content.imakeit
        })
        .where("recipes.user_id", query.id);
    } catch (e) {
      console.log(e);
    }
  }

  async listComment(recipeID) {
    //tested
    try {
      let query = await this.knex("comments")
        .select("users.id", "users.username", "comments.content")
        .innerJoin("recipes", "comments.recipe_id", "recipes.id")
        .innerJoin("users", "comments.user_id", "users.id")
        .where("recipes.id", recipeID);
      console.log(query);
      return query;
    } catch (e) {
      console.log(e);
    }
  }

  async addComment(recipeID, user, content) {
    //tested
    try {
      let query = await this.knex("users")
        .select("id")
        .where("users.username", user)
        .first();
      return await this.knex
        .insert({
          content: content,
          recipe_id: recipeID,
          user_id: query.id
        })
        .into("comments");
    } catch (e) {
      console.log(e);
    }
  }

  async iMakeIt() {}
}

module.exports = RecipeService;
