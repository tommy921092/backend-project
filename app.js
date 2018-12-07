const app = require("./utils/init-app")(); //initialize the app
const axios = require("axios");

const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
// const RecipeService = require("");

const fs = require("fs");
const https = require("https");
const isLoggedIn = require("./utils/guard").isLoggedIn;

const hb = require("express-handlebars");
const port = 3000 || process.env.PORT;

const ViewRouter = require("./ViewRouter");

const { RecipeRouter } = require("./routers");

const { RecipeService, CommentService } = require("./services");
const unirest = require("unirest");
const queryString = require("query-string");
// const app = require('./utils/init-app')();
// app.use('/',new ViewRouter().router());
// let recipeService = new RecipeService(knex);
// let commentService = new CommentService(knex);
// app.use("/api/recipes",isLoggedIn, new RecipeRouter(recipeService).router());
app.engine("handlebars", hb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
/*
  var i = req.url.indexOf('?');
  var query = req.url.substr(i+1);
  to get the query string after ?
  */
