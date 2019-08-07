var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const playersController = require('../controllers/playersController');
const messageController = require('../controllers/messageController');
const sportCenterController = require('../controllers/sportCenterController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

///////////////Token////////////////////////////

// crear el token para logearte
router.post('/auth', authController.checkUser);


///////////////Jugadores////////////////////////////

//listar jugadores por filtros
router.post('/playersFilter', playersController.listFiltros);

// Listar jugadores con campo borrado a false
router.get('/players', playersController.list);

//crear un Jugador
router.post('/add', playersController.add);

// editar un Jugador 
router.put('/players/:id', playersController.edit);

//editar Campo borrado a true (es como borrar)
router.put('/players/erased/:id', playersController.editErased);

// // borrar un Jugador 
// router.delete('/players/:id', playersController.delete);


///////////////Mensajes////////////////////////////

// crea un mensaje
router.post('/msgs/add', messageController.add);

//Editar mensaje a visto por destinatario(editar campo visto)
router.put('/msgs/:id', messageController.edit);

// Listar mis mensajes
router.get('/msgs', messageController.list);


///////////////Centros Deportivos////////////////////////////

//crear un centro deportivo si eres admin
router.post('/sportCenter/add', sportCenterController.add);

// Listar centros deportivos
router.get('/sportCenters', sportCenterController.list);

//editar Centro Deportivo si eres admin
router.put('/sportCenter/edit/:id', sportCenterController.edit);

// borrar Centro Deportivo si eres admin
router.delete('/sportCenter/:id', sportCenterController.delete);

module.exports = router;
