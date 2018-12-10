const express = require("express");
const path = require('path');

class UserRouter {
  constructor(UserService) {
    this.UserService = UserService;
  }
  router() {
    const router = express.Router();

    router.get("/profile", (req, res) => {
      
      this.UserService.getProfile(req.user.username).then(function(result) {
        console.log('user details:', result)
      });

      res.sendFile(path.join(__dirname, '../public', '/profile.html'));

    });

    router.post("/changePW", (req, res) => {
      return this.UserService.changePW(req.user.username, req.body.password);
    });
    router.post("/changeUsername", (req, res) => {
      return this.UserService.changeusername(req.user.email,req.body.username);
    });
    return router;
  }
}

module.exports = UserRouter;
