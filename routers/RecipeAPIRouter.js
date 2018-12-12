const express = require("express");
class RecipeAPIRouter {
  constructor(recipeAPIService, recipeService) {
    this.recipeAPIService = recipeAPIService;
    this.recipeService = recipeService;
  }
  router() {
    const router = express.Router();
    router.get("/searchByAPI", (req, res) => {
      const ingredient = req.query.ingredients;
      const name = req.query.name;
      const excludeIngredients = req.query.excludeIngredients;
      if (ingredient) {
        this.recipeAPIService.findByIngredients(ingredient); //ingredients=apple%2Csugar%2Conion
      } else if (name) {
        this.recipeAPIService.findByName(name).then(data => {
          let obj = data.results;
          res.render("recipeListAPI", { obj });
        });
      } else {
        return this.recipeAPIService.findRandomRecipe();
      }
    });

    router.get("/searchByAPI/recipe", (req, res) => {
      this.recipeAPIService.getRecipeInfo(req.query.id).then(() => {
        this.recipeService.showDetails('API').then(data => {
          // get recipe info from database
          res.render("recipeInfo", { data });
        });
      }); //get detail info and save to database
    });
    return router;
  }
}

module.exports = RecipeAPIRouter;
