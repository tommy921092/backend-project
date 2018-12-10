require("dotenv").config();
const unirest = require("unirest");
class RecipeAPIService {
  constructor(knex) {
    this.knex = knex;
  }
  findRecipeByName(name, excludeIngredients) {
    console.log(excludeIngredients);
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
          console.log(result.body);
          return result.body;
        });
    } else {
      const url =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?&number=2&query=" +
        name;
      unirest
        .get(url)
        .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
        .end(function(result) {
          console.log(result.body);
          return result.body;
        });
    }
  }

  findRandomRecipe() {
    unirest
      .get(
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=2"
      )
      .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
      .end(function(result) {
        console.log(result.body);
        return result.body;
      });
  }

  findByIngredients(food) {
    const url =
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=2&ranking=1&ingredients=" +
      food;
    unirest
      .get(url)
      .header("X-RapidAPI-Key", process.env.FOODAPI_KEY)
      .end(function(result) {
        console.log(result.body);
        return result.body;
      });
  }

  getRecipeInfo(recipeID) {
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
        if (query=='') {
          console.log('test1');
          await this.knex("recipes").insert({
            recipe_name: result.body.title,
            imageurl: result.body.image,
            instructions: result.body.instructions,
            time_taken: result.body.readyInMinutes
          });

          let query2 = await this.knex("recipes")
            .where("recipe_name", result.body.title)
            .returning("id");
          result.body.extendedIngredients.forEach(async ele => {
            let query3 = await this.knex('ingredients').where('name',ele.name);
            if (query3=='') {
              //if the ingredient not exist in the table
              await this.knex("ingredients").insert("name", ele.name);
              //have to also update the recipeIngredients table
              // await this.knex("ingredients").insert({});
            }
          });
        }
        return result.body;
      });
  }

  save(recipeID, user) {}
}

module.exports = RecipeAPIService;
