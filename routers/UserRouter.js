const express = require("express");

class UserRouter {
  constructor(UserService) {
    this.UserService = UserService;
  }
  router() {
    const router = express.Router();

    router.get("/profile", (req, res) => {
      console.log(req.user.id);

      this.UserService.getProfile(req.user.id).then(function(result) {
        console.log('user details:', result)
        res.render(('profile'), { 
        name: result[0].username,
        email: result[0].email,
        profilepic: result[0].profilepicture
        })
      });

      // res.sendFile(path.join(__dirname, '../public', '/profile.html'));

    });

    router.post("/changePW", (req, res) => {
      return this.UserService.changePW(req.user.username, req.body.password);
    });
    
    router.post("/profile", (req, res) => {
      this.UserService.changeUsername(req.user.email,req.body.username);

      this.UserService.getProfile(req.user.id).then(function(result) {
        console.log('user details:', result)
        res.render(('profile'), { 
        name: result[0].username,
        email: result[0].email,
        profilepic: result[0].profilepicture
        })
      });
    });
    return router;
  }
}

module.exports = UserRouter;
