const express = require('express');
const router = express.Router();
const UserController = require('../App/Controllers/Http/UserController');
const AuthMiddleware = require('../App/Middlewares/AuthMiddleware');

router.use((req, res, next) => {
    AuthMiddleware.auth({req, res, next});
})

router.get('/getProfile', (req, res, next) => {
    UserController.getProfile({req, res, next});  
});

router.put('/updateProfile', (req, res, next) => {
    UserController.updateProfile({req, res, next});  
});

module.exports = router;
