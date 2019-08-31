const playersModel = require("../models/playersModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
// const secret = "lo se yo";
const secret = "mysecret";

const playersController = {};

//Listar Players con campo borrado == false
playersController.list = (req, res) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
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
  } catch (err) {
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
  } catch (err) {
    res.send("error al verificar token en listarFiltros player");
  }
};

//crear un Jugador
playersController.add = (req, res) => {
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
    };
    console.log(player);
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

          // res.status(400).send({ e: err.errno });
          // res.send({
          //   type: "error",
          //   data: err
          // });
        });
  } else {
    res.send({
      type: "error el body esta vacio"
    });
  }
};

//añadir imagen avatar a un Jugador
// playersController.editImage = (req, res) => {
//   const id_player = req.params.id;
//   const p = req.body;
//   console.log(p);
//   if (p) {
//     let player = {
//       avatar: req.file.filename,
//       ...(p.username != null && { username: p.username }),
//       ...(p.email != null && { email: p.email }),
//       ...(p.password != null && { password: sha256(u.password) }),
//       ...(p.city != null && { city: p.city }),
//       ...(p.rating != null && { rating: p.rating }),
//       ...(p.genre != null && { genre: p.genre })
//     };
//     if (
//       player.avatar &&
//       player.username &&
//       player.email &&
//       player.password &&
//       player.city &&
//       player.rating &&
//       player.genre
//     ) {
//       console.log(player);
//       playersModel
//         .editImage(player,id_player)
//         .then(rows => {
//           res.send({
//             type: "success",
//             data: rows
//           });
//         })
//         .catch(err => {
//           res.send({
//             type: "error",
//             data: err
//           });
//         });
//     } else {
//       res.send({
//         type: "error, algun o algunos campos vienen vacio"
//       });
//     }
//   } else {
//     res.send({
//       type: "error el body esta vacio"
//     });
//   }
// };

// editarte a ti mismo como Jugador o editar a otro si eres Administrador
playersController.edit = (req, res) => {
  // decoded token
  const p = req.body;
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
      };
      console.log("player");
      console.log(player);
      if (decoded.isAdmin) {
        console.log(p.isAdmin)
        console.log("entrar al isAdmin");
        player = {
          ...player,
          ...(p.isAdmin !== null && { isAdmin: p.isAdmin})

          // ...(p.isAdmin !== null && { isAdmin: p.isAdmin ? 1 : 0 })
        };
      }
      console.log("rol admin:" + decoded.isAdmin);
      console.log(player);
      playersModel
        .edit(player, id_player)
        .then(rows => {
          console.log("guayEditController " + rows);
          playersModel
            .listById(id_player)
            .then(rows => {
              console.log("guayListController en EditController " + rows);
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
          console.log(err);
          res.status(401).send("ErrorEditController....Petaaaaso " + err);
        });
    } else {
      // error tu no puedes editar
      res.status(401).send("You don`t have permission for edit");
    }
  } catch (e) {
    res.status(401).send("You don`t have permission for edit " + e);
  }
};

// editar el campo borrado a true del player con id_player si eres tu o si eres Administrador
playersController.editErased = (req, res) => {
  // decoded token
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
        erased: 1
      };
      playersModel
        .editErased(user, id_player)
        .then(user => {
          console.log("guayEditEraserController");
          res.send(user);
        })
        .catch(err => {
          console.log(err);
          res.send("ErrorEditEraserController....Petaaaaso");
        });
    } else {
      // error tu no puedes editar
      res.status(401).send("You don`t have permission for editEraser");
    }
  } catch (e) {
    res.status(401).send("You don`t have permission for editEraser" + e);
  }
};

// borrarte a ti mismo como Jugador o borrar a otro si eres Administrador
playersController.delete = (req, res) => {
  try {
    const id_player = req.params.id;
    console.log("id de url: " + id_player);
    console.log(req.headers.authorization);
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
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
