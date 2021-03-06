var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const playersController = require("../controllers/playersController");
const messageController = require("../controllers/messageController");
const sportCenterController = require("../controllers/sportCenterController");
const friendsController = require("../controllers/friendsController");
const notificationsController = require("../controllers/notificationsController");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

//-------------------------TOKEN  LOGIN----------------------------------------//

// crear el token para logearte
router.post("/auth", authController.checkUser);


//-------------------------PLAYER-------------------------------------------//

//listar Players por filtros
router.post("/playersFilter", playersController.listFiltros);

// Listar Players con campo borrado a false
router.get("/players", playersController.list);

//---------subida de imagenes----------//

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file !== "" && file) {
      cb(null, "public/uploads/avatar");
    }
  },
  filename: (req, file, cb) => {
    if (file !== "") {
      let nombre = file.originalname.split(".");
      let extension = nombre[nombre.length - 1];
      if (req.body.id_player === "") {
        cb(null, Date.now() + "." + extension);
      } else {
        cb(null, req.body.id_player + "." + extension);
      }
    }else{
      console.log("el archivo file esta vacio o no existe")
    }
  }
});

// Init Upload
const uploadAvatar = multer({
  storage
}).single("file");

//crear un Player
router.post("/add", uploadAvatar, playersController.add);

// router.put('/addImage/:id', uploadAvatar, playersController.editImage);

// editar un Player
router.put("/players/:id", uploadAvatar, playersController.edit);

//editar Campo borrado a true (es como borrar)
router.put("/players/erased/:id", playersController.editErased);

// // borrar un Player
// router.delete('/players/:id', playersController.delete);


//-------------------------MENSAJES------------------------------------------//

// crea un mensaje
router.post("/msgs/add", messageController.add);

//Editar mensaje a visto por destinatario(editar campo visto)
router.put("/msgs/:id", messageController.edit);

// Listar mis mensajes
router.get("/msgs", messageController.list);

//NO USADO, FALTA HACER EL FRONT DE ESTA PARTE
//-------------------------CENTROS DEPORTIVOS--------------------------------//

//crear un centro deportivo si eres admin
router.post("/sportCenter/add", sportCenterController.add);

// Listar centros deportivos
router.get("/sportCenters", sportCenterController.list);

//editar Centro Deportivo si eres admin
router.put("/sportCenter/edit/:id", sportCenterController.edit);

// borrar Centro Deportivo si eres admin
router.delete("/sportCenter/:id", sportCenterController.delete);


//-------------------------AMIGOS--------------------------------------------//

//crear un amigo
router.post("/friends/add", friendsController.add);

// Listar mis amigos
router.get("/friends", friendsController.list);

// Listar amigos de playerID
router.get("/friends/:id", friendsController.listById);

//Aceptar amistad la amistad
router.put("/friends/accepted/:id", friendsController.edit);

//Cambiar a visto a mi nuevo amigo
router.put("/friends/watched/:id", friendsController.editWatched);

// borrar peticion de amistad
router.delete("/friends/delete/:id", friendsController.delete);

//obtner cuantas notificiaciones nuevas tengo
//(numero de mensajes nuevos y
// numero de peticiones de amistad nuevas)
router.get("/notifications", notificationsController.counter);
module.exports = router;
