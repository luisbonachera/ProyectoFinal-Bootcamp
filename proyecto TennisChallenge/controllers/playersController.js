const playersModel = require("../models/playersModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
const secret = "mysecret";

const playersController = {};

//Listar Players con campo borrado == false
playersController.list = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    playersModel
      .list(decoded.isAdmin)
      .then(players => {
        res.send(players);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({ e: err });
      });
  } catch (err) {
    res.status(400).send({ e: err });
  }
};

//listar player por filtros
playersController.listFiltros = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const filtros = req.body;
    const decoded = jwt.verify(token, secret);
    playersModel
      .listFiltros(decoded.isAdmin, filtros)
      .then(players => {
        res.send(players);
      })
      .catch(err => {
        res.status(400).send({ e: err });
      });
  } catch (err) {
    res.status(400).send({ e: err });
  }
};

//crear un Jugador
playersController.add = (req, res) => {
  try {
    const p = req.body;
    if (p) {
      let player = {
        ...(req.file &&
          req.file.filename != "" && { avatar: req.file.filename }),
        ...(p.username != null && { username: p.username }),
        ...(p.email != null && { email: p.email }),
        ...(p.password != null && { password: sha256(p.password) }),
        ...(p.city != null && { city: p.city }),
        ...(p.rating != null && { rating: p.rating }),
        ...(p.genre != null && { genre: p.genre })
      }
      playersModel
        .add(player)
        .then(rows => {
          res.send({
            type: "success",
            data: rows
          });
        })
        .catch(err => {
          res.status(400).send({ e: err });
        });
    } else {
      res.status(400).send({ e: "error el body esta vacio" });
    }
  } catch (err) {
    res.status(400).send({ e: err });
  }
};

// editarte a ti mismo como Jugador o editar a otro si eres Administrador
playersController.edit = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    if (decoded.isAdmin || decoded.id_player === +id_player) {
      const p = req.body;
      const id_player = req.params.id;
      let player = {
        ...(req.file &&
          req.file.filename != "" && { avatar: req.file.filename }),
        ...(p.username != "" && { username: p.username }),
        ...(p.email != "" && { email: p.email }),
        ...(p.password != "" &&
          p.password != null && { password: sha256(p.password) }),
        ...(p.city != "" && { city: p.city }),
        ...(p.rating != "" && { rating: +p.rating }),
        ...(p.genre != "" && { genre: p.genre })
      }
      if (decoded.isAdmin) {
        player = {
          ...player,
          ...(p.isAdmin !== null && { isAdmin: p.isAdmin })
        };
      }
      playersModel
        .edit(player, id_player)
        .then(rows => {
          playersModel
            .listById(id_player)
            .then(rows => {
              res.send(rows);
            })
            .catch(err => {
              console.log(err);
              res
                .status(401)
                .send(
                  "ErrorListController en EditController....Petaaaaso " + err
                );
            });
        })
        .catch(err => {
          res.status(400).send({ e: err });
        });
    } else {
      res.status(401).send("You don`t have permission for edit");
    }
  } catch (err) {
    res.status(401).send({ e: err });
  }
};

// editar el campo borrado a true del player con id_player si eres tu 
// o si eres Administrador
playersController.editErased = (req, res) => {
  try {
    const id_player = req.params.id;
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    if (decoded.isAdmin || decoded.id_player === +id_player) {
      let user = {
        erased: 1
      };
      playersModel
        .editErased(user, id_player)
        .then(user => {
          res.send(user);
        })
        .catch(err => {
          res.status(401).send({ e: err });
        });
    } else {
      // error tu no puedes editar
      res.status(401).send({ e: "You don`t have permission for editEraser" });
    }
  } catch (err) {
    res.status(401).send({ e: err });  
  }
};

// borrarte a ti mismo como Jugador o borrar a otro si eres Administrador
//NO USADO
playersController.delete = (req, res) => {
  try {
    const id_player = req.params.id;
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    if (decoded.isAdmin || decoded.id_player === +id_player) {
      playersModel
        .delete(id_player)
        .then(row => {
          res.send(row);
        })
        .catch(err => {
          res.status(401).send({ e: err });
        });
      } else {
        // error tu no puedes editar
        res.status(401).send({ e: "You don`t have permission for delete" });
      }
  } catch (err){
    res.status(401).send({ e: err });  
  }
};

module.exports = playersController;
