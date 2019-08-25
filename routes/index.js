const express = require('express');
const router = express.Router();
const passport = require('passport');
const validator = require('../handlers/validator');
const { errorHandler } = require('../handlers/errorHandlers');

const homeController = require('../controllers/home.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const noteController = require('../controllers/note.controller');

router.get('/', homeController.homePage);

router.get('/register', homeController.registerForm);
router.post('/register', userController.validateRegistrationInfo, authController.register);

router.get('/login', homeController.loginForm);
router.post('/login', userController.validateLoginInfo, authController.login);

router.get('/about', homeController.about);

router.get('/notes/', authController.isLoggedIn, noteController.getNotes);
router.post('/notes/:id', authController.isLoggedIn, noteController.saveNote);
module.exports = router;