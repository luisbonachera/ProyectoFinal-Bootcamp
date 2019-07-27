const playersModel = require("../models/playersModel");
const sha256 = require("sha256");
const jwt = require('jsonwebtoken');
// const secret = "lo se yo";
const secret = "mysecret";

const playersController = {};

//crear un Jugador
playersController.add = (req, res) => {
  const u = req.body;
  const user = {
    ...( id_player != null && { id_player: id_player }),
    ...(u.username != null && { username: u.username }),
    ...(u.email != null && { email: u.email }),
    ...(u.password != null && { password: sha256(u.password) }),
    ...(u.city != null && { city: u.city }),
    ...(u.rating != null && { rating: u.rating }),
    ...(u.genre != null && { genre: u.genre }),
    ...(u.isAdmin != null && { isAdmin: u.isAdmin })
  }
  if(user.username && user.password){
    playersModel.add(user)
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
  }else{
    res.send({
      type: "error, Username o password son null"
    })
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
    console.log(decoded.id_player);
    if (!decoded.isAdmin || decoded.id_player === id_player) {
      console.log("entrar")
      const user = {
        ...( id_player != null && { id_player: id_player }),
        ...(u.username != null && { username: u.username }),
        ...(u.email != null && { email: u.email }),
        ...(u.password != null && { password: sha256(u.password) }),
        ...(u.city != null && { city: u.city }),
        ...(u.rating != null && { rating: u.rating }),
        ...(u.genre != null && { genre: u.genre }),
        ...(u.isAdmin != null && { isAdmin: u.isAdmin })
      }
      playersModel.edit(user,id_player)
        .then(user => {
          console.log("guayEditController");
          res.send(user);
        })
        .catch(err => {
          res.send("ErrorEditController....Petaaaaso");
        });

    } else {
      // error tu no puedes editar
      res.status(401).send("You don`t have permission for edit");
    }
  }
  catch{
    res.status(401).send("You don`t have permission");
  }
}


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
    if (!decoded.isAdmin || decoded.id_player === id_player) {
      console.log("entrar")
      
      playersModel.delete(id_player)
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
  }
  catch{
    res.status(401).send("You don`t have permission");
  }
}






module.exports = playersController;