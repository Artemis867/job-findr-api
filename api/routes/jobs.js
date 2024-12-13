const express = require('express');
const router = express.Router();


router.get('/check', (req, res, next) => {

  res.json({
    message: '[API working] access jobs route',
  });
});

router.get('/list', (req, res, next) => {
  
  res.json({
    message: 'access job list endpoint',
  });
});

module.exports = router;