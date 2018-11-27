const express = require("express");

class RecipeRouter {
  constructor(recipeService) {
    this.recipeService = recipeService;
  }

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    router.patch("/:id", this.put.bind(this));
    router.delete("/:id", this.delete.bind(this));
    return router;
  }

  get(req, res) {
    //Validation Logic
    return this.recipeService
      .list()
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    //Validation Logic
    return this.recipeService
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    //Validation Logic
    return this.recipeService
      .update(req.params.id, req.body)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  }

  delete(req, res) {
    //Validation Logic
    return this.recipeService
      .delete(req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = RecipeRouter;
