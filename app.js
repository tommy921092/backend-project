const app = require("./utils/init-app")(); //initialize the app
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const port = 3000 || process.env.PORT;
const express = require('express');
const https = require('https');
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

const imageRouter = require('./public/imageRouter');
const LoginRouter = require("./public/LoginRouter")(express);
const { RecipeRouter, RecipeAPIRouter } = require("./routers");
const { RecipeService, RecipeAPIService } = require("./services");
const ViewRouter = require("./ViewRouter");

const recipeService = new RecipeService(knex);
const recipeAPIService = new RecipeAPIService(knex);

app.use(
  session({
    secret: "supersecret",
    // what do these do? - receive deprecated undefined message without
    resave: true,
    saveUninitialized: true
  })
);
setupPassport(app);

app.use('/',imageRouter);
app.use("/", LoginRouter);
//should add isLoggedIn to ensure services only are accessible to users
app.use("/", new RecipeAPIRouter(recipeAPIService).router());
app.use("/", new RecipeRouter(recipeService).router());
// app.use("/api/recipes",isLoggedIn, new RecipeRouter(recipeService).router());
https.createServer(options, app).listen(port);
console.log("listening on port ", port);
/*
  var i = req.url.indexOf('?');
  var query = req.url.substr(i+1);
  to get the query string after ?
  */
