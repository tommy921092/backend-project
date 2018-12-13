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
          "recipes.imageurl",
          "users.username",
          "recipes.time_taken",
          this.knex.raw("ARRAY_AGG(tags.tagname) as tags")
        )
        .fullOuterJoin("users", "recipes.user_id", "users.id")
        .fullOuterJoin("recipes_tags", "recipes.id", "recipes_tags.recipe_id")
        .fullOuterJoin("tags", "recipes_tags.tag_id", "tags.id")
        .whereRaw(`LOWER(recipes.recipe_name) LIKE ?`, [`%${keyword}%`]) //for case-insensitive
        .groupBy("recipes.id", "users.username");
      return query;
    } catch (e) {
      console.log(e);
    }
  }
  async listByTags(tags) {
    // localhost:3000/search?tags=apple%2Csugar
    //tested
    try {
      let Arr = decodeURIComponent(tags).split(",");
      let query = await this.knex("recipes")
        .select(
          "recipes.id as recipeID",
          "recipes.recipe_name",
          "recipes.imageurl",
          "users.username",
          "recipes.time_taken",
          this.knex.raw("ARRAY_AGG(tags.tagname) as tags")
        )
        .fullOuterJoin("users", "recipes.user_id", "users.id")
        .fullOuterJoin("recipes_tags", "recipes_tags.recipe_id", "recipes.id")
        .fullOuterJoin("tags", "recipes_tags.tag_id", "tags.id")
        .whereIn("tags.tagname", Arr)
        .groupBy("recipes.id", "users.username");
      return query;
    } catch (e) {
      console.log(e);
    }
  }
  async listByIngredients(Ingredients) {
    // localhost:3000/search?Ingredients=apple%2Csugar
    //tested
    try {
      let Arr = decodeURIComponent(Ingredients).split(",");
      let query = await this.knex("recipes")
        .select(
          "recipes.id as recipeID",
          "recipes.recipe_name",
          "recipes.imageurl",
          "users.username",
          "recipes.time_taken",
          this.knex.raw("ARRAY_AGG(ingredients.ingredient_name) as Ingredients")
        )
        .fullOuterJoin("users", "recipes.user_id", "users.id")
        .fullOuterJoin(
          "recipes_ingredients",
          "recipes_ingredients.recipe_id",
          "recipes.id"
        )
        .fullOuterJoin(
          "ingredients",
          "recipes_ingredients.ingredient_id",
          "ingredients.id"
        )
        .whereIn("ingredients.ingredient_name", Arr)
        .groupBy("recipes.id", "users.username");
      return query;
    } catch (e) {
      console.log(e);
    }
  }

  async showDetails(recipeID) {
    //tested
    try {
      let lastID;
      if (recipeID == "API") {
        recipeID = await this.knex("recipes")
          .select("id")
          .orderBy("id", "desc")
          .first();
        lastID = recipeID.id;
        recipeID = lastID;
      }
      let query = await this.knex("recipes")
        .select(
          "recipes.recipe_name",
          "recipes.imageurl",
          "users.username",
          "recipes.time_taken",
          "recipes.instructions"
        )
        .fullOuterJoin("users", "users.id", "recipes.user_id")
        .where("recipes.id", recipeID)
        .first();
      let query2 = await this.knex("recipes_ingredients") //return ingredient_name, measure_name and amount
        .innerJoin(
          "ingredients",
          "recipes_ingredients.ingredient_id",
          "ingredients.id"
        )
        .innerJoin("measures", "recipes_ingredients.measure_id", "measures.id")
        .where("recipes_ingredients.recipe_id", recipeID);
      // console.log(query2);
      return { basicInfo: query, ingredientInfo: query2 };
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
        .fullOuterJoin("users_recipes", "users_recipes.recipe_id", "recipes.id")
        .fullOuterJoin("users", "users.id", "users_recipes.user_id")
        .where("users.username", user);
    } catch (e) {
      console.log(e);
    }
  }

  async addRecipe(user, content, imageurl) {
    try {
      let query = await this.knex("users")
        .select("id")
        .where("users.username", user)
        .first();
      let query = await this.knex("recipes")
        .insert({
          recipe_name: content.name,
          user_id: query.id,
          imageurl: imageurl,
          instructions: content.instructions,
          time_taken: content.time_taken,
        }).returning('id')
    } catch (e) {
      console.log(e);
    }
  }

  async listComment(recipeID) {
    //tested
    try {
      let query = await this.knex("comments")
        .select("users.id", "users.username", "comments.content")
        .fullOuterJoin("recipes", "comments.recipe_id", "recipes.id")
        .fullOuterJoin("users", "comments.user_id", "users.id")
        .where("recipes.id", recipeID);
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

  async iMakeIt(recipeID, user) {}
}

module.exports = RecipeService;
