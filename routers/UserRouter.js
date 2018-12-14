const express = require("express");
const upload = require("../multer");
const singleUpload = upload.single("image"); // 'image' key

class UserRouter {
  constructor(UserService) {
    this.UserService = UserService;
  }
  router() {
    const router = express.Router();

    // prevent users from accessing certain parts of app
    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }

      res.redirect("/login");
    }

    // generate profile page
    router.get("/profile", isLoggedIn, (req, res) => { // this endpoint will execute the profile rendering
      console.log(req.user.id);

      this.UserService.getProfile(req.user.id).then(function (result) {
        console.log('user result:', result[0].username);

        res.render("profile", {
          name: result[0].username,
          email: result[0].email,
          profilepic: () => {
            // logic to check if user has a profile picture
            if (result[0].profilepicture) {
              return result[0].profilepicture;
            } else {
              return "../assets/profile-stock.jpg"
            }
          }
        });
      });
    });

    router.post("/changePW", (req, res) => {
      return this.UserService.changePW(req.user.username, req.body.password);
    });

    // Change Username
    router.post("/profile", (req, res) => {
      this.UserService.changeUsername(req.user.email, req.body.username);
      console.log('user req:', req.user.username)
      res.redirect('/profile'); // get /profile will be executed
    });

    // Image uploader
    router.post("/image-upload", (req, res) => {
      // POST endpoint we call singleUpload - multer will get the file sent via the req object
      singleUpload(req, res, (err, some) => {
        if (err) {
          console.log(err);
          return res.status(err.statusCode).send({
            errors: [
              {
                title: "Image Upload Error",
                detail: err.message
              }
            ]
          });
        }
        console.log("S3 bucket url:", req.file.location);
        // insert the req.file.location to our knex table
        this.UserService.changeProfilePicture(req.user.email, req.file.location);
        res.redirect('/profile');
      })
    })

    router.get("/upload", isLoggedIn, (req, res) => {
      res.render("uploadform");
    });

    return router;
  }
}

module.exports = UserRouter;
