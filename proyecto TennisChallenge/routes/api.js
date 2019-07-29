var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const playersController = require('../controllers/playersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Listar jugadores
router.get('/players', playersController.list)

// crear el token para logearte
router.post('/auth', authController.checkUser);



//crear un Jugador
router.post('/add', playersController.add);

// editar un Jugador 
router.put('/players/:id', playersController.edit);

// borrar un Jugador 
router.delete('/players/:id', playersController.delete);



module.exports = router;
