const notificationsModel = require("../models/notificationsModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
// const secret = "lo se yo";
const secret = "mysecret";

const notificationsController = {};

//obtner cuantas notificiaciones nuevas tengo
//(numero de mensajes nuevos y
// numero de peticiones de amistad nuevas)
notificationsController.counter = (req, res) => {
    try {
      console.log(req.headers.authorization);
      const token = req.headers.authorization.replace("Bearer ", "");
      console.log(token);
      console.log(jwt.verify(token,"mysecret"));
      const decoded = jwt.verify(token, "mysecret");
      notificationsModel
        .counter(decoded.id_player)
        .then(notifications => {
          console.log("guayList");
          console.log(notifications);
          res.send(notifications);
        })
        .catch(err => {
          console.log(err);
          res.send("errorControlerNotifications...Petaaaaaaso");
        });
    } catch (err) {
      res.send("error al verificar token en Notifications");
    }
  };

module.exports = notificationsController;
