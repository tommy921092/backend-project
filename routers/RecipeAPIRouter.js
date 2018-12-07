const express = require("express");
class RecipeAPIRouter {
  constructor(recipeAPIService) {
    this.recipeAPIService = recipeAPIService;
  }
  router() {
    const router = express.Router();
    router.get("/searchByAPI", (req, res) => {
      const ingredient = req.query.ingredients;
      const name = req.query.name;
      const excludeIngredients = req.query.excludeIngredients;
      if (ingredient) {
        return this.recipeAPIService.findByIngredients(ingredient); //ingredients=apple%2Csugar%2Conion
      } else if (name & ingredient) {
        return this.recipeAPIService.findRecipeByName(name, excludeIngredients);
        //????
      } else if (name) {
      } else {
        return this.recipeAPIService.findRandomRecipe();
      }
    });

    router.get("/searchByAPI/recipe", (req, res) => {
      return this.recipeAPIService.getRecipeInfo(req.query.id);
    });
    return router;
  }
}

module.exports = RecipeAPIRouter;
