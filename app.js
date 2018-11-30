const app = require("./utils/init-app")(); //initialize the app
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const axios = require("axios");

const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
// const redis = require("redis");
// const redisClient = redis.createClient({
//   host: REDIS_HOST,
//   port: REDIS_PORT
// });
const fs = require("fs");
const https = require("https");
const isLoggedIn = require("./utils/guard").isLoggedIn;
const ViewRouter = require("./ViewRouter");
var unirest = require("unirest");
const port = 3000 || process.env.PORT;

//app.use('/',new ViewRouter().router());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
