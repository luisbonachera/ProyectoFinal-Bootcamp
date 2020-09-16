const authModel = require("../models/authModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
const secret = "mysecret";

const authController = {};

authController.checkUser = (req, res) => {
  const user = req.body;
  user.password = sha256(user.password);
  authModel
    .checkUser(user)
    .then(rows => {
      if (rows.length == 1) {
        let isAdmin = rows[0].isAdmin? true : false;
        var token = jwt.sign(
          {
            id_player: rows[0].id_player,
            avatar: rows[0].avatar,
            username: rows[0].username,
            isAdmin: isAdmin,
            email: rows[0].email,
            city: rows[0].city,
            genre: rows[0].genre,
            rating: rows[0].rating
          },
          secret
        );
        // despues de "mysecret",{expireIn:3600});
        console.log(token);
        res.send(token);
      } else if (rows.length > 1) {
        res.status(401).send({ e: "Error en la consulta, sale mas de 1 resultado" });
      } else {
        res.status(400).send({ e: "El usuario no existe" });
      }
     
     
    })
    .catch(err => {
      // sabiendo el numero de error, sabemos que tipo de error es.
      res.status(401).send({ e: err.errno });
    });
};

module.exports = authController;
