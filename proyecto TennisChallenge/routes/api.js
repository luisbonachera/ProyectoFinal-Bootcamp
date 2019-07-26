var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const playersController = require('../controllers/playersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// te crea el token
router.post('/auth', authController.find);

//crear un jugador
router.post('/add', playersController.add);

module.exports = router;
