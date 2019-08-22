const passport = require('passport');

exports.login = passport.authenticate('login', {
  failureRedirect: '/test',
  successRedirect: '/fuckyou',
  session: false
});

exports.register = passport.authenticate('register', {
  failureRedirect: '/register',
  successRedirect: '/notes',
  session: false
});
