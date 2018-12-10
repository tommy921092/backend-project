const express = require("express");
const bodyParser = require("body-parser");
const hb = require("express-handlebars");
// const AuthChallenger = require("./AuthChallenger.js");
const path = require('path');
// the Auth function and users authentication information



module.exports = () => {
  let app = express();
  app.engine("handlebars", hb({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/public", express.static(path.join(__dirname, "public")));

  //handle multiple users using the authentication information the users input
  /*
  app.use(
    basicAuth({
      authorizer: new AuthChallenger(knex),//knex
      authorizeAsync: true,
      challenge: true,
      realm: "Food Recipe Finder Project"
    })
  );
  */
  return app;
};
