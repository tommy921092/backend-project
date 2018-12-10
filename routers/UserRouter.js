const express = require("express");
class UserRouter {
  constructor(UserService) {
    this.UserService = UserService;
  }
  router() {
    const router = express.Router();

    router.get("/profile", (req, res) => {
      return this.UserService.getProfile(req.user.username);
    });

    router.post("/changePW", (req, res) => {
      return this.UserService.changePW(req.user.username, req.body.password);
    });
    router.post("/changeUsername", (req, res) => {
      return this.UserService.changeusername(req.user.email,req.body.username);
    });
  }
}

module.exports = UserRouter;
