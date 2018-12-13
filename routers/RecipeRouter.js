const express = require("express");
const upload = require("../multer");
const singleUpload = upload.single("image");
class RecipeRouter {
  constructor(recipeService) {
    this.recipeService = recipeService;
  }
  router() {
    const router = express.Router();
    //get recipe details
    router.get("/search/recipe", (req, res) => {
      this.recipeService.showDetails(req.query.id).then(data => {
        res.render("recipeInfo", { data });
      }); //req.query.id = recipes.id in our database

      // this.recipeService.listComment(req.query.id);
    });
    //search by name
    router.get("/search", (req, res) => {
      if (req.query.name) {
        this.recipeService.listByName(req.query.name).then(data => {
          res.render("recipeList", { data });
        });
      }
      if (req.query.tags) {
        this.recipeService.listByTags(req.query.tags).then(data => {
          res.render("recipeList", { data });
        });
      }
      if (req.query.ingd) {
        this.recipeService
          .listByIngredients(req.query.ingd)
          .then(data => {
            console.log(data);
            res.render("recipeList", { data });
          });
      }
    });
    //get saved recipes
    // router.get("/save", (req, res) => {
    //   return this.recipeService.listBySave(req.query.id);
    // });
    //add recipe
    router.post("/addRecipe", (req, res) => {
      // singleUpload(req, res, function(err, some) {
      //   if (err) {
      //     console.log(err);
      //     return res.status(err.statusCode).send({
      //       errors: [{ title: "Image Upload Error", detail: err.message }]
      //     });
      //   }

      //   // insert the req.file.location to our knex table
      //   console.log(req.file.location);
      //   this.recipeService.addRecipe(
      //     req.user.username,
      //     req.body,
      //     req.file.location
      //   );
      // });
      console.log('upload', req.user.username);
    });
    //add comment
    router.post("/comment", (req, res) => {
      return this.recipeService
        .addComment(req.query.id, req.body.comment, req.user.username)
        .then(() => {
          this.recipeService.listComment(req.query.id);
        });
    });
    //rate recipe
    router.post("/rate", (req, res) => {
      return this.recipeService.rate(req.body.rate);
    });

    router.post("/recipe", (req, res) => {
      console.log('save recipe with id', req.query.id);
      return this.recipeService.save(req.query.id, req.user.username);
    });

    router.post("/imakeit", (req, res) => {
      // return this.recipeService.
    });

    return router;
  }
}

module.exports = RecipeRouter;
