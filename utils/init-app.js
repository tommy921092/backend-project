const express = require("express");
const bodyParser = require("body-parser");
const hb = require("express-handlebars");
// const AuthChallenger = require("./AuthChallenger.js");
const path = require('path');
// the Auth function and users authentication information



module.exports = () => {
  let app = express();
  app.engine("handlebars", hb({ defaultLayout: "main" }));//set up main.hbs as default layout in hbs
  app.set("view engine", "handlebars");//set view engine for hb
  app.use(bodyParser.urlencoded({ extended: false }));//to view req.body
  app.use(bodyParser.json());
  //same as express.static(__dirname+'/public)


  return app;
};
