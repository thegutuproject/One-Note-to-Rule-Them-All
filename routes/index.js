const express = require('express');
const router = express.Router();

const validator = require('../handlers/validator');
const { errorHandler } = require('../handlers/errorHandlers');

const homeController = require('../controllers/home.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

router.get('/', homeController.homePage);

router.get('/register', homeController.registerForm);
router.post('/register', userController.validateRegistrationInfo, userController.registerUser);

router.get('/login', homeController.loginForm);
router.post('/login', userController.validateLoginInfo, authController.login);

router.get('/notes', homeController.notes);

router.get('/about', homeController.about);
module.exports = router;