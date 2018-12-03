const app = require("./utils/init-app")(); //initialize the app
const axios = require("axios");

const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const RecipeService = require("");

const fs = require("fs");
const https = require("https");
const isLoggedIn = require("./utils/guard").isLoggedIn;

const hb = require("express-handlebars");
const port = 3000 || process.env.PORT;

const ViewRouter = require("./ViewRouter");

const { RecipeRouter } = require("./routers");

const { RecipeService, CommentService } = require("./services");

// const app = require('./utils/init-app')();
//app.use('/',new ViewRouter().router());
let recipeService = new RecipeService(knex);
let commentService = new CommentService(knex);
app.use("/api/recipes",isLoggedIn, new RecipeRouter(recipeService).router());
app.engine("handlebars", hb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  //recipeService here to list the random recipes in home pages
  res.render("home");
});

/* app.get("/random", (req, res) => {
  axios
    .get(
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=2",
      {
        headers: {
          "X-Mashape-Key": "C64uSjkfeCmshNu4jJSBQXddDqXcp1BAXMVjsnuLQ2BPchpPJn",
          "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
        }
      }
    )
    .then(response => {
      console.log(response.data);
      res.send({
        data: response.data.recipes
      });
    })
    .catch(err => {
      res.send("Error:", err);
    });
}); */
/* unirest
  .get(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=2&tags=vegetarian%2Cdessert"
  )
  .header(
    "X-RapidAPI-Key",
    "C64uSjkfeCmshNu4jJSBQXddDqXcp1BAXMVjsnuLQ2BPchpPJn"
  )
  .end(function(result) {
    console.log(result.body.recipes);
  });
 */
app.listen(port, () => {
  console.log("Server running on port: ", port);
});
