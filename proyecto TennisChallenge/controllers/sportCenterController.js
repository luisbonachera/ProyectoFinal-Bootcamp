const sportCenterModel = require("../models/sportCenterModel");

const jwt = require("jsonwebtoken");

const sportCenterController = {};

//crear un centro deportivo si eres admin
sportCenterController.add = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const sc = req.body;
    console.log(sc);
    console.log(sc.name);
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
    console.log(decoded);
    if (decoded.isAdmin === true) {
      console.log("entrar");
      if (sc) {
        let sportCenter = {
          ...(sc.name != null && { name: sc.name }),
          ...(sc.city != null && { city: sc.city }),
          ...(sc.zone != null && { zone: sc.zone }),
          ...(sc.number_court != null && { number_court: +sc.number_court }),
          ...(sc.price_hour != null && { price_hour: +sc.price_hour }),
          ...(sc.price_extra_night != null && {
            price_extra_night: +sc.price_extra_night
          })
        };
        if (
          sc.name &&
          sc.city &&
          sc.zone &&
          sc.number_court &&
          sc.price_hour &&
          sc.price_extra_night &&
          sc.price_extra_night
        ) {
          console.log(sportCenter);
          console.log("todos los campos rellenos");
          sportCenterModel
            .add(sportCenter)
            .then(rows => {
              res.send(rows);
            })
            .catch(err => {
              res.status(401).send(err);
            });
        } else {
          res.status(401).send("error, algun o algunos campos vienen vacio");
        }
      } else {
        res.status(401).send("error el body esta vacio");
      }
    } else {
      res.status(401).send("No se pudo decodificar el token o no eres Admin");
    }
  } catch (e) {
    res.status(401).send("No se pudo decodificar el token o no existe " + e);
  }
};

// Listar centros deportivos
sportCenterController.list = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const sc = req.body;
    console.log(sc);
    console.log(sc.name);
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
    console.log(decoded);
    if (decoded) {
      console.log("entrar");
      sportCenterModel
        .list()
        .then(sportCenters => {
          res.send(sportCenters);
        })
        .catch(err => {
          res.status(401).send(err);
        });
    } else {
      res.status(401).send("No se pudo decodificar el token o no eres Admin");
    }
  } catch (e) {
    res.status(401).send("No se pudo decodificar el token o no existe " + e);
  }
};

//editar centros deportivos si eres Admin
sportCenterController.edit = (req, res) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const sc = req.body;
    const id_sports_center = req.params.id;
    console.log("id de url: " + id_sports_center);
    
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
    if (decoded.isAdmin) {
      console.log("entrar");
        let sportCenter = {
            ...(sc.name != null && { name: sc.name }),
            ...(sc.city != null && { city: sc.city }),
            ...(sc.zone != null && { zone: sc.zone }),
            ...(sc.number_court != null && { number_court: +sc.number_court }),
            ...(sc.price_hour != null && { price_hour: +sc.price_hour }),
            ...(sc.price_extra_night != null && {
              price_extra_night: +sc.price_extra_night
            })
      };
      console.log("rol admin:" + decoded.isAdmin);
      sportCenterModel
        .edit(sportCenter, id_sports_center)
        .then(rows => {
          console.log("guayEditSportCenterController");
          res.send(rows);
        })
        .catch(err => {
          res.status(401).send("ErrorEditSportCenterController....Petaaaaso " + err);
        });
    } else {
      // error tu no puedes editar
      res.status(401).send("You don`t have permission for EditSportCenterController");
    }
  } catch (e) {
    res.status(401).send("You don`t have permission forEditSportCenterController" + e);
  }
};

// borrar Centro Deportivo si eres admin
sportCenterController.delete = (req, res) => {
  // decoded token
  
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const id_sports_center = req.params.id;
    console.log("id de url: " + id_sports_center);
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
    if (decoded.isAdmin) {
      console.log("entrar");
      sportCenterModel
        .delete(id_sports_center)
        .then(row => {
          console.log("guayDeleteSportCenterController");
          res.send(row);
        })
        .catch(err => {
          res.send("ErrorDeleteSportCenterController....Petaaaaso " + err);
        });
    } else {
      // error tu no puedes editar
      res.status(401).send("You don`t have permission for DeleteSportCenterController");
    }
  } catch (err) {
    res.status(401).send("You don`t have permission for DeleteSportCenterController " + err);
  }
};



module.exports = sportCenterController;
