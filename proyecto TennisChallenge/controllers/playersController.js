const playersModel = require("../models/playersModel");
const playersController = {};

playersController.add = (req, res) => {
  const user = req.body;
  playerModel
    .add(user)
    .then(result => {
      res.send({
        type: "success",
        data: result
      });
    })
    .catch(err => {
      res.send({
        type: "error",
        data: err
      });
    });
};

module.exports = playersController;