const playersModel = require("../models/playersModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
// const secret = "lo se yo";
const secret = "mysecret";

const playersController = {};

//Listar Players
playersController.list = (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  try {
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
  playersModel
    .list(decoded.isAdmin)
    .then(players => {
      console.log("guayList");
      console.log(players);
      res.send(players);
    })
    .catch(err => {
      console.log(err);
      res.send("errorControlerList...Petaaaaaaso");
    });
  }catch(err) {
    res.send("error al verificar token en listar player");
  }
};
//listar por filtros
playersController.listFiltros = (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  const filtros = req.body;
  try {
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
  playersModel
    .listFiltros(decoded.isAdmin, filtros)
    .then(players => {
      console.log("guayListFiltro");
      console.log(players);
      res.send(players);
    })
    .catch(err => {
      console.log(err);
      res.send("errorControlerListFiltro...Petaaaaaaso");
    });
  }catch(err) {
    res.send("error al verificar token en listarFiltros player");
  }
};

//crear un Jugador
playersController.add = (req, res) => {
  const u = req.body;
  if (u) {
    let user = {
      ...(u.username != null && { username: u.username }),
      ...(u.email != null && { email: u.email }),
      ...(u.password != null && { password: sha256(u.password) }),
      ...(u.city != null && { city: u.city }),
      ...(u.rating != null && { rating: u.rating }),
      ...(u.genre != null && { genre: u.genre }),
      
    };
    if (
      user.username &&
      user.email &&
      user.password &&
      user.city &&
      user.rating &&
      user.genre
    ) {
     
      playersModel
        .add(user)
        .then(rows => {
          res.send({
            type: "success",
            data: rows
          });
        })
        .catch(err => {
          res.send({
            type: "error",
            data: err
          });
        });
    } else {
      res.send({
        type: "error, algun o algunos campos vienen vacio"
      });
    }
  } else {
    res.send({
      type: "error el body esta vacio"
    });
  }
};

// editarte a ti mismo como Jugador o editar a otro si eres Administrador
playersController.edit = (req, res) => {
  // decoded token
  const u = req.body;
  const id_player = req.params.id;
  console.log("id de url: " + id_player);
  console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  try {
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
    if (decoded.isAdmin || decoded.id_player === +id_player) {
      console.log("entrar");
      let user = {
        ...(u.username != null && { username: u.username }),
        ...(u.email != null && { email: u.email }),
        ...(u.password != null && { password: sha256(u.password) }),
        ...(u.city != null && { city: u.city }),
        ...(u.rating != null && { rating: u.rating }),
        ...(u.genre != null && { genre: u.genre })
      };
      if (decoded.isAdmin) {
        console.log("entrar al isAdmin");
        user = {
          ...user,
          ...(u.isAdmin !== null && { isAdmin: u.isAdmin ? 1 : 0 })
        };
      }
      console.log("rol admin:" + u.isAdmin);
      playersModel
        .edit(user, id_player)
        .then(user => {
          console.log("guayEditController");
          res.send(user);
        })
        .catch(err => {
          console.log(err);
          res.send("ErrorEditController....Petaaaaso");
        });
    } else {
      // error tu no puedes editar
      res.status(401).send("You don`t have permission for edit");
    }
  } catch (e) {
    res.status(401).send("You don`t have permission");
  }
};

// borrarte a ti mismo como Jugador o borrar a otro si eres Administrador
playersController.delete = (req, res) => {
  // decoded token
  const id_player = req.params.id;
  console.log("id de url: " + id_player);
  console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  try {
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
    console.log(decoded.id_player);
    if (decoded.isAdmin || decoded.id_player === +id_player) {
      console.log("entrar");

      playersModel
        .delete(id_player)
        .then(row => {
          console.log("guayDeleteController");
          res.send(row);
        })
        .catch(err => {
          res.send("ErrorDeleteController....Petaaaaso");
        });
    } else {
      // error tu no puedes editar
      res.status(401).send("You don`t have permission for delete");
    }
  } catch {
    res.status(401).send("You don`t have permission");
  }
};

module.exports = playersController;
