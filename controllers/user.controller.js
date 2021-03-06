const { check, validationResult, sanitizeBody } = require('express-validator');
const User = require('../models/user');
const moment = require('moment');

exports.validateRegistrationInfo = [

  sanitizeBody('email'),
  check('email')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Email required!'),
  check('email')
    .isEmail()
    .withMessage('Email must be valid.'),
  check('email')
    .normalizeEmail()
    .trim()
    .escape(),
  check('email')
    .isLength({ max: 100 })
    .withMessage('Due to a technical issue, emails cannot be longer than 100 characters'),
  sanitizeBody('password'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Password required!'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long!'),
  check('password')
    .trim()
    .escape(),
  check('passwordConfirmation')
    .trim()
    .exists({ checkNull: true, checkFalsy: true })
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .withMessage('passwordConfirmation field must have the same value as the password field'),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  }];

exports.validateLoginInfo = [

  sanitizeBody('email'),
  check('email')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Email required!'),
  check('email')
    .isEmail()
    .withMessage('Email must be valid.'),
  check('email')
    .normalizeEmail()
    .trim()
    .escape(),
  check('email')
    .isLength({ max: 100 })
    .withMessage('Due to a technical issue, emails cannot be longer than 100 characters'),
  sanitizeBody('password'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Password required!'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long!'),
  check('password')
    .trim()
    .escape(),
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  }];

exports.registerUser = async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const userDbQuery = await User.query().insertAndFetch(data);
    if (userDbQuery) {
      return res.status(200).json({
        success: true,
        message: 'User successfully created!'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'An error has occurred.',
      error: error
    })
  }
};

exports.loginUser = async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    rememberMe: req.body.rememberMe
  };

  try {
    const user = await User.query().first().where({ email: data.email });
    const passwordValid = await user.verifyPassword(data.password);
    if (passwordValid) {

      return res.status(200).json({
        success: true,
        message: 'User successfully authenticated!',
        token: token
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Something went wrong :/',
      error: error
    })
  }
};