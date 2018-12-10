const path = require('path');
//router.js
const passport = require('passport');

module.exports = (express) => {
  const router = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  }

  router.get('/secret', isLoggedIn, (req, res) => {
    res.send('Here you go, a secret');
  });

  // login
  router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/error'
  }));

  // facebook routes
  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/'
  }), (req, res) => res.redirect('/')); // /profile refers to get request from UserRouter.js

  router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));

  // google routes
  router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
  }), (req,res) => {
    console.log('successfully reached callback URI');
    res.redirect('/');
  });

  router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // sign-up
  router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/signup.html'));
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/error'
  }));

  router.get('/error', (req, res) => {
    res.send('You are not logged in!');
  });

  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/index.html'));
  });

  // profile page redirect
  // router.get('/profile', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../public', '/profile.html'));
  // });

  // auth logout
  router.get('/logout', (req, res) => {
    req.logout(); // can be unreliable - does not clear our session
    req.session.destroy();
    console.log('logging out and destroying express session');
    // res.send('Logging out!');
    res.redirect('/');
  })

  return router;
};