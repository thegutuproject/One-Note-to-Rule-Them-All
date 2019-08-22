const passport    = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

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
    session: false
  }, async (email, password, done) => {
    console.log("inside local strategy");
    try {
      console.log('inside try');
      console.log('email', email);
      console.log('password', password);
      const user = await User.query().where({ email: email }).first();
      console.log('user', user);
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
      // return done(null, false, { message: 'Something went wrong :/' });
      return done(error);
    }
  })
);

passport.use('jwt',
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('auth'),
    secretOrKey: process.env.JWT_SECRET
  }, async (jwt_payload, done) => {
    try {
      const user = await User.query().first().where({ email: jwt_payload.email});
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: 'Error authenticating user. Please try again'});
      }
    } catch (error) {
      done(error);
    }
  })
);
