const express = require('express');
const router = express.Router();
const AuthController = require('../App/Controllers/Http/AuthController');
const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');

router.post('/register', (req, res, next) => {
    AuthController.register({req, res, next})
});

router.post('/login', (req, res, next) => {
    AuthController.login({req, res, next})
});
router.post('/logout', (req, res, next) => {
    AuthController.logout({req, res, next}) 
});

module.exports = router;
