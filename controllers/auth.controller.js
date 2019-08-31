const passport = require('passport');

exports.login = passport.authenticate('login', {
  failureRedirect: '/login',
  successRedirect: '/notes'
});

exports.register = passport.authenticate('register', {
  failureRedirect: '/register',
  successRedirect: '/notes'
});

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  res.redirect('/login');
};

