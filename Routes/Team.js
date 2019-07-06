const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../App/Middlewares/AuthMiddleware')

router.use((req, res, next) => {
   AuthMiddleware.auth({req, res, next});
})

router.get('/', (req, res, next) => {
   return res.status(200).json({
      code: 0,
      data: null,
      mesenge: 'team hear'
  })
})
module.exports = router;
