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
      console.log("guayCheckUSer");
      if (rows.length == 1) {
        console.log("user: " + rows[0].username + " rol: " + rows[0].isAdmin);
        isAdmin = rows[0].admin ? true : false;
        var token = jwt.sign(
          {
            id_player: rows[0].id_player,
            username: rows[0].username,
            isAdmin: rows[0].isAdmin === 1 ? true : false,
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
        res.status(400).send("Error en la consulta, sele mas de 1 resultado");
      } else {
        res.status(400).send("El usuario no existe");
      }
      // res.send({
      //     type: "success",
      //     data: result
      // });
    })
    .catch(err => {
      res.send({
        type: "error al devolver la consulta de CheckUSer",
        data: err
      });
    });
};

module.exports = authController;
