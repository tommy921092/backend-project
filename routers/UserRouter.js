const express = require("express");
class UserRouter {
  constructor(UserService) {
    this.UserService = UserService;
  }
  router() {
    const router = express.Router();

    router.get("/profile", (req, res) => {
      return this.UserService.getProfile(req.auth.user);
    });

    router.post("/changePW", (req, res) => {
      return this.UserService.changePW(req.auth.user, req.body.password);
    });
  }
}

module.exports = UserRouter;
