const app = require("./utils/init-app")(); //initialize the app
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const ViewRouter = require("./ViewRouter");

const knexFile = require("./knexfile")[NODE_ENV];
const knex = require("knex")(knexFile);
const redis = require("redis");
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
});
const fs = require('fs');
const https = require('https');
const isLoggedIn = require('./utils/guard').isLoggedIn;
const ViewRouter = require('./ViewRouter');
