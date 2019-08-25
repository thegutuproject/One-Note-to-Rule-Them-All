const passport    = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const moment = require('moment');

const User = require('../models/user');

passport.use(
  'register',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
      try {
        const userDbQuery = await User.query().insertAndFetch({ email: email, password: password });
        if (!userDbQuery) {
          return done(null, false, { message: 'Email already registered. Please try to log in' })
        } else {
          return done(null, userDbQuery)
        }
      } catch(error) {
        done(error)
      }
    })
);

passport.use(
  'login',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const user = await User.query().where({ email: email }).first();
      if (!user) {
        return done(null, false, { message: 'Email does not exist. Please register.' })
      } else {
        const passwordValid = await user.verifyPassword(password);
        if (!passwordValid) {
          return done(null, false, { message: 'Incorrect username or password. Please try again.' })
        }

        return done(null, user, { message: 'Successfully logged in!' });
      }
    } catch (error) {
      return done(null, false, { message: 'Something went wrong :/' });
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.query().where({ id: id }).first();
    done(null, user.id);
  } catch (error) {
    done(error, null)
  }
 });
