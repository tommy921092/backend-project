//router.js
const passport = require("passport");

module.exports = express => {
  const router = express.Router();

  // prevent users from accessing certain parts of app
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login");
  }

  router.get("/login", (req, res) => {
    res.render("login");
  });

  // local login
  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/error"
    })
  );

  // facebook routes
  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log("successfully reached callback URI");
      res.redirect("/profile")
    }
  );

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  // google routes
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log("successfully reached callback URI");
      res.redirect("/profile");
    }
  );

  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // sign-up
  router.get("/signup", (req, res) => {
    res.render("signup");
  });

  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/error"
    })
  );

  // error route
  router.get("/error", (req, res) => {
    res.send("You are not logged in!");
  });

  // auth logout
  router.get("/logout", (req, res) => {
    req.logout(); // can be unreliable - does not clear our session
    req.session.destroy();
    console.log("logging out and destroying express session");
    res.redirect("/");
  });

  return router;
};
