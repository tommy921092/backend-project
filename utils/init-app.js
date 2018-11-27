const express = require("express");
const bodyParser = require("body-parser");
const hb = require("express-handlebars");
const basicAuth = require("express-basic-auth");
const knexConfig = require('../knexfile.js').development;
const knex = require('knex')(knexConfig);
const AuthChallenger = require('./AuthChallenger.js');
// the Auth function and users authentication information
module.exports = () => {
  let app = express();

  app.engine("handlebars", hb({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static("public"));
  //handle multiple users using the authentication information the users input
  app.use(
    basicAuth({
      authorizer: new AuthChallenger(knex),//knex
      authorizeAsync: true,
      challenge: true,
      realm: "Food Recipe Finder Project"
    })
  );
  return app;
};
