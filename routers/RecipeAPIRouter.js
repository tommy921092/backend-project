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
        this.recipeAPIService.findByIngredients(ingredient); //ingredients=apple%2Csugar%2Conion
      } else if (name) {
        this.recipeAPIService.findByName(name).then(data => {
          let obj = data.results;
          res.render("recipeList", { obj });
        });
      } else {
        return this.recipeAPIService.findRandomRecipe();
      }
    });

    router.get("/searchByAPI/recipe", (req, res) => {
      this.recipeAPIService.getRecipeInfo(req.query.id);
      res.render("recipeInfo");
    });
    return router;
  }
}

module.exports = RecipeAPIRouter;
