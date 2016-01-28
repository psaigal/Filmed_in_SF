var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.post('/submit', function(req, res) {
  var movieName = req.body.movieName //params
  var data = {nameOfMovie: movieName}
  res.send(data);
});

module.exports = router;
