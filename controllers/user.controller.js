const jwt = require('jsonwebtoken');
const { check, validationResult, sanitizeBody } = require('express-validator');

exports.validateInfo = [

  sanitizeBody('email'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email required!'),
  check('email')
    .isEmail()
    .withMessage('Email must be valid.'),
  check('email')
    .normalizeEmail()
    .trim()
    .escape(),
  sanitizeBody('password'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password required!'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long!'),
  check('password')
    .trim()
    .escape(),

  // sanitizeBody('password-confirm'),
  // check('password-confirm')
  //   .equals('password')
  //   .withMessage("Passwords do not match"),
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(422).json({ errors: errors.array() });
    }

    next();
  }];

async function registerUser(req, res, next) {
  const data = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const userDbQuery = await User.query().insertAndFetch(data);
    if (userDbQuery) {
      res.status(200).json({
        success: true,
        message: 'User successfully created!'
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'An error has occurred.',
      error: error
    })
  }
}

async function signIn(req, res, next) {

  const data = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const user = await User.query().first().where({ email: data.email });
    console.log(user);
    const passwordValid = await user.verifyPassword(data.password);
    if (passwordValid) {

      const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME });

      res.status(200).json({
        success: true,
        message: 'User successfully authenticated!',
        token: token
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Something went wrong :/',
      error: error
    })
  }
}

exports.registerUser = registerUser;
exports.signIn = signIn;