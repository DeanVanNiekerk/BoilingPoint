var express = require('express');
var router = express.Router();

/* GET kettle status. */
router.get('/status', function(req, res, next) {
  res.send('todo');
});

router.get('/getcooking', function(req, res, next) {
  res.send('todo');
});

router.get('/stopcooking', function(req, res, next) {
  res.send('todo');
});

module.exports = router;
