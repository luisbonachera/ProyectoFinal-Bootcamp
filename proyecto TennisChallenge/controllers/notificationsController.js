const notificationsModel = require("../models/notificationsModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
const secret = "mysecret";

const notificationsController = {};

//obtner cuantas notificiaciones nuevas tengo
//(numero de mensajes nuevos y
// numero de peticiones de amistad nuevas)
notificationsController.counter = (req, res) => {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, secret);
      notificationsModel
        .counter(decoded.id_player)
        .then(notifications => {
          res.send(notifications);
        })
        .catch(err => {
          res.status(400).send({ e: err });
        });
    } catch (err) {
      res.status(400).send({ e: err });
    }
  };

module.exports = notificationsController;
