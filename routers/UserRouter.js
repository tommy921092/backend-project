const express = require("express");
class UserRouter {
  constructor(UserService) {
    this.UserService = UserService;
  }
  router() {
    const router = express.Router();
    router.post("/", (req, res) => {
      return this.UserService.create(
        req.body.username,
        req.body.password,
        req.body.email
      );
    });

    router.get("/profile", (req, res) => {
      return this.UserService.getProfile(req.auth.user);
    });

    router.post("/changePW", (req, res) => {
      return this.UserService.changePW(req.auth.user, req.body.password);
    });
  }
}

module.exports = UserRouter;
