const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');
const userController = require('../controllers/user.controller');

router.get('/', homeController.homePage);
router.post('/signup', userController.validateInfo, userController.registerUser);
router.post('/signin', userController.validateInfo, userController.signIn);

module.exports = router;