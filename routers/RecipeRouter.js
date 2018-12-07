const express = require("express");
class RecipeRouter {
  constructor(recipeService) {
    this.recipeService = recipeService;
  }
  router() {
    const router = express.Router();
    //get recipe details
    router.get("/recipe", (req, res) => {
      this.recipeService.showDetails(req.query.q);
      this.recipeService.listComment(req.query.q);
    });
    //search by name
    router.get("/search", (req, res) => {
      if (req.query.name) {
        this.recipeService.listByName(req.query.name);
      }
      if (req.query.tags) {
        this.recipeService.listByTags(req.query.tags);
      }
    });
    //get saved recipes
    router.get("/save", (req, res) => {
      return this.recipeService.listBySave(req.auth.user);
    });
    //add recipe
    router.post("/addRecipe", (req, res) => {
      this.recipeService.addRecipe(req.auth.user, req.body.content);
    });
    //add comment
    router.post("/addComment", (req, res) => {
      return this.recipeService
        .addComment(req.query.name, req.body.comment, req.auth.user)
        .then(() => {
          this.recipeService.listComment(req.query.q);
        });
    });
    //rate recipe
    router.post("/rate", (req, res) => {
      return this.recipeService.rate(req.body.rate);
    });

    router.post("/save", (req, res) => {
      return this.recipeService.save(req.query.q, req.auth.user);
    });

    router.post('/imakeit',(req,res)=>{
      // return this.recipeService.
    })

    return router;
  }
}

module.exports = RecipeRouter;
