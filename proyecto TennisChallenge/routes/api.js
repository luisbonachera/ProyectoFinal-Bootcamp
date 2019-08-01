var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const playersController = require('../controllers/playersController');
const messageController = require('../controllers/messageController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//listar jugadores por filtros
router.get('/playersFilter', playersController.listFiltros);

// Listar jugadores
router.get('/players', playersController.list);

// crear el token para logearte
router.post('/auth', authController.checkUser);



//crear un Jugador
router.post('/add', playersController.add);

// editar un Jugador 
router.put('/players/:id', playersController.edit);

// borrar un Jugador 
router.delete('/players/:id', playersController.delete);


// crea un mensaje
router.post('/msgs/add', messageController.add);

//mensaje visto por destinatario(editar campo visto)
router.put('/msgs/:id', messageController.edit);

// Listar mis mensajes
router.get('/msgs', messageController.list);

module.exports = router;
