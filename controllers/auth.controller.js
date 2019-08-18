const passport = require('passport');

exports.login = passport.authenticate('login', {
  failureRedirect: '/login',
  successRedirect: '/',
});

exports.register = passport.authenticate('register', {
  failureRedirect: '/register',
  successRedirect: '/login',
});
