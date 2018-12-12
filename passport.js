//passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy; // setup facebook strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy; // setup google strategy
const bcrypt = require("./bcrypt");
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
require("dotenv").config();

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    "local-login",
    new LocalStrategy(async (email, password, done) => {
      try {
        let users = await knex("users").where({ email: email });
        if (users.length == 0) {
          return done(null, false, { message: "Incorrect credentials." });
        }
        let user = users[0];
        // if (user.password === password) { // update our login strategy to ensure we use hashed passwords
        let result = await bcrypt.checkPassword(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect credentials." });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let users = await knex("users").where({ id: id });
    if (users.length == 0) {
      return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });

  // facebook strategy
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "email", "displayName", "picture.type(large)"] // set to force email info to be
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("user is:", profile.displayName);
        // console.log("email is:", profile.emails[0].value); // this is returning undefined
        let userResult = await knex("users").where({ facebookid: profile.id });
        if (userResult.length == 0) {
          let user = {
            // when using Postgresql to access table, can't use capital letters for columns - using knex, you can use / create tables with uppercase column names
            facebookid: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilepicture: `https://graph.facebook.com/${profile.id}/picture?width=200&height=200`,
            accesstoken: accessToken
            // enableProof: true // if you delete the user from table, this will throw an error if you readd user
          };
          let query = await knex("users")
            .insert(user)
            .returning("id");
          user.id = query[0]; // assign the table primary key to new facebook login user
          done(null, user);
        } else {
          done(null, userResult[0]); // if userResult exists, return the user
        }
      }
    )
  );

  // google strategy
  passport.use(
    "google",
    new GoogleStrategy(
      {
        // options for the google strategy
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("user is:", profile.displayName);
        // console.log("email is:", profile.emails[0].value);
        let userResult = await knex("users").where({ googleid: profile.id });
        if (userResult.length == 0) {
          let user = {
            googleid: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilepicture: profile.photos[0].value.split("?sz=50")[0] + "?sz=" + "200",
            accesstoken: accessToken
          };
          let query = await knex("users")
            .insert(user)
            .returning("id");
          user.id = query[0];
          done(null, user);
        } else {
          done(null, userResult[0]);
        }
      }
    )
  );

  // sign-up - crucial for bcrypt hashing to work
  passport.use(
    "local-signup",
    new LocalStrategy(async (email, password, done) => {
      try {
        let users = await knex("users").where({ email: email });
        if (users.length > 0) {
          return done(null, false, { message: "Email already taken" });
        }
        let hash = await bcrypt.hashPassword(password);
        const newUser = {
          email: email,
          password: hash
        };
        let userId = await knex("users")
          .insert(newUser)
          .returning("id");
        console.log(userId); // knex returns our userId in array format
        newUser.id = userId[0]; // assign our newUser the new unique id
        console.log(newUser);
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    })
  );
};
