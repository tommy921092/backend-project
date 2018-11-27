const express = require("express");
const passport = require("passport");
module.exports = class ViewRouter {
  router() {
    const router = express.Router();
    router.get("/", (req, res) => res.render(""));
    router.get(
      "auth/facebook",
      passport.authenticate("facebook", {
        scope: ["user_friends", "manage_pages"]
      })
    );
    router.get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", {
        failureRedirect: "/"
      }),
      (req, res) => res.redirect("/users")
    );
    return router;
  }
};
