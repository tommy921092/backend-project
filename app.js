const app = require("./utils/init-app")(); //initialize the app
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const port = process.env.PORT || 3000;
const express = require("express");
const https = require("https");
const path = require("path");

// const RecipeService = require("");

const isLoggedIn = require("./utils/guard").isLoggedIn;

const hb = require("express-handlebars");
const fs = require("fs");
const session = require("express-session");
const setupPassport = require("./passport");

const options = {
  cert: fs.readFileSync("./localhost.crt"),
  key: fs.readFileSync("./localhost.key")
};

const LoginRouter = require("./routers/LoginRouter")(express);
// const ViewRouter = require("./ViewRouter");
const { RecipeRouter, RecipeAPIRouter, UserRouter } = require("./routers");
const { RecipeService, RecipeAPIService, UserService } = require("./services");

const recipeService = new RecipeService(knex);
const recipeAPIService = new RecipeAPIService(knex);
const userService = new UserService(knex);

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "supersecret",
    // what do these do? - receive deprecated undefined message without
    resave: true,
    saveUninitialized: true
  })
);
setupPassport(app);

// login/logout button
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/", LoginRouter);
app.use("/", new UserRouter(userService).router());
//should add isLoggedIn to ensure services only are accessible to users
app.use("/", new RecipeAPIRouter(recipeAPIService, recipeService).router());
app.use("/", new RecipeRouter(recipeService).router());
app.get("/", (req, res) => {
  recipeAPIService.findRandomRecipe().then(data => {
    let imageArr = data.recipes.map(ele => ele.image);
    let titleArr = data.recipes.map(ele => ele.title);
    let idArr = data.recipes.map(ele => ele.id);
    res.render("home", { image: imageArr, title: titleArr, recipeID: idArr });
  });
  // res.render('home');
});
// app.use("/api/recipes",isLoggedIn, new RecipeRouter(recipeService).router());
https.createServer(options, app).listen(port);
console.log("listening on port ", port);
/*
  var i = req.url.indexOf('?');
  var query = req.url.substr(i+1);
  to get the query string after ?
  */
