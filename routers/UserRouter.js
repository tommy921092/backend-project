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
    router.get("/profile", isLoggedIn, (req, res) => {
      console.log(req.user.id);

<<<<<<< HEAD
      this.UserService.getProfile(req.user.id).then(function (result) {
        // console.log('user details:', result)
=======
      this.UserService.getProfile(req.user.id).then(function(result) {
        console.log("user details:", result);
>>>>>>> 011168018ce9f35d3e87f2335c42746bd177a505

        res.render("profile", {
          name: result[0].username,
          email: result[0].email,
          profilepic: () => {
            // logic to check if user has a profile picture
            if (result[0].profilepicture) {
              return result[0].profilepicture;
            } else {
<<<<<<< HEAD
              return "../assets/profile-stock.jpg"
=======
              return "../assets/images/profile-stock.jpg";
>>>>>>> 011168018ce9f35d3e87f2335c42746bd177a505
            }
          }
        });
      });

      // res.sendFile(path.join(__dirname, '../public', '/profile.html'));
    });

    router.post("/changePW", (req, res) => {
      return this.UserService.changePW(req.user.username, req.body.password);
    });

    // Change Username
    router.post("/profile", (req, res) => {
      console.log('user details:', req.user.username)
      this.UserService.changeUsername(req.user.email, req.body.username).then(

<<<<<<< HEAD
        this.UserService.getProfile(req.user.id).then(function (result) {
          console.log('user details:', result[0].username)
          res.render(('profile'), {
            name: result[0].username,
            email: result[0].email,
            profilepic: () => {
              // logic to check if user has a profile picture
              if (result[0].profilepicture) {
                return result[0].profilepicture;
              } else {
                return "../assets/profile-stock.jpg";
              }
            }
          })
        }));
=======
      this.UserService.getProfile(req.user.id).then(function(result) {
        console.log("user details:", result);
        res.render("profile", {
          name: result[0].username,
          email: result[0].email,
          profilepic: () => {
            // logic to check if user has a profile picture
            if (result[0].profilepicture) {
              return result[0].profilepicture;
            } else {
              return "../assets/images/profile-stock.jpg";
            }
          }
        });
      });
>>>>>>> 011168018ce9f35d3e87f2335c42746bd177a505
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
<<<<<<< HEAD
        this.UserService.changeProfilePicture(req.user.email, req.file.location).then(

          this.UserService.getProfile(req.user.id).then(function (result) {
            res.render(('profile'), {
              name: result[0].username,
              email: result[0].email,
              profilepic: () => {
                // logic to check if user has a profile picture
                if (result[0].profilepicture) {
                  return result[0].profilepicture;
                } else {
                  return "../assets/profile-stock.jpg";
                }
              }
            })
          })
        );
      })
    })
=======
        this.UserService.changeProfilePicture(
          req.user.email,
          req.file.location
        );

        this.UserService.getProfile(req.user.id).then(function(result) {
          res.render("profile", {
            name: result[0].username,
            email: result[0].email,
            profilepic: () => {
              // logic to check if user has a profile picture
              if (result[0].profilepicture) {
                return result[0].profilepicture;
              } else {
                return "../assets/images/profile-stock.jpg";
              }
            }
          });
        });
      });
    });

    router.get("/upload", (req, res) => {
      res.render("uploadform");
    });
>>>>>>> 011168018ce9f35d3e87f2335c42746bd177a505

    return router;
  }
}

module.exports = UserRouter;
