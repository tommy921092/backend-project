require("dotenv").config();
const unirest = require("unirest");

class RecipeAPIService {
  constructor(knex) {
    this.knex = knex;
  }
  findByName(name, excludeIngredients) {
    return new Promise((resolve, reject) => {
      if (excludeIngredients) {
        const url =
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?excludeIngredients=" +
          excludeIngredients + //use encodeURIComponent(['tag1','tag2','tag3'])= 'tag1%2Ctag2%2Ctag3'
          "&number=2&query=" +
          name;
        unirest
          .get(url)
          .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
          .end(function(result) {
            if (result) {
              resolve(result.body);
            }
            reject(result.body);
          });
      } else {
        const url =
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?&number=4&query=" +
          name;
        unirest
          .get(url)
          .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
          .end(function(result) {
            if (result) {
              resolve(result.body);
            }
            reject(result.body);
          });
      }
    });
  }

  findRandomRecipe() {
    return new Promise((resolve, reject) => {
      unirest
        .get(
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3"
        )
        .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
        .end(function(result) {
          if (result) {
            resolve(result.body);
          }
          reject(result.body);
        });
    });
  }

  findByIngredients(food) {
    return new Promise((resolve, reject) => {
      const url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=2&ranking=1&ingredients=" +
        food;
      unirest
        .get(url)
        .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
        .end(function(result) {
          if (result) {
            resolve(result);
          }
          reject(result);
        });
    });
  }

  getRecipeInfo(recipeID) {
    return new Promise((resolve, reject) => {
      const url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
        recipeID +
        "/information";
      unirest
        .get(url)
        .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
        .end(async result => {
          let query = await this.knex("recipes").where(
            "recipe_name",
            result.body.title
          );
          if (query == "") {
            let query2 = await this.knex("recipes")
              .insert({
                recipe_name: result.body.title,
                imageurl: result.body.image,
                instructions: result.body.instructions,
                time_taken: result.body.readyInMinutes
              })
              .returing("id");

            for (let i = 0; i < result.body.extendedIngredients.length; i++) {
              let query3 = await this.knex("ingredients").where(
                "ingredient_name",
                result.body.extendedIngredients[i].name
              );
              if (query3 == "") {
                //if the ingredient not exist in the table
                await this.knex("ingredients").insert({
                  ingredient_name: result.body.extendedIngredients[i].name
                });
              }
              let query4 = await this.knex("measures").where(
                "measure_name",
                result.body.extendedIngredients[i].unit
              );
              if (query4 == "") {
                //if the measure unit not exist in the table
                await this.knex("measures").insert({
                  measure_name: result.body.extendedIngredients[i].unit
                });
              }

              let query5 = await this.knex("ingredients")
                .select("id")
                .where(
                  "ingredient_name",
                  result.body.extendedIngredients[i].name
                )
                .first();
              let query6 = await this.knex("measures")
                .select("id")
                .where("measure_name", result.body.extendedIngredients[i].unit)
                .first();
              await this.knex("recipes_ingredients").insert({
                recipe_id: query2.id,
                ingredient_id: query5.id,
                measure_id: query6.id,
                amount: result.body.extendedIngredients[i].amount
              });
            }
            let query7 = await this.knex("tags").where({
              tagname: result.body.dishTypes[0]
            });
            if (query7 == "") {
              console.log("tag name not exist in table");
              await this.knex("tags").insert({
                tagname: result.body.dishTypes[0]
              });
            }
            let query8 = await this.knex("tags")
              .where("tagname", result.body.dishTypes[0])
              .first();
            await this.knex("recipes_tags").insert({
              recipe_id: query2[0],
              tag_id: query8.id
            });
          }
          if (result) {
            resolve(result.body);
          }
          reject(result.body);
        });
    });
  }
}

module.exports = RecipeAPIService;
