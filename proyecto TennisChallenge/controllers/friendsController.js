

const friendsModel = require("../models/friendsModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
const secret = "mysecret";

const friendsController = {};

//crea un amigo
friendsController.add = (req, res) => {

    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let my_id = decoded.id_player;
        let id_player_friend = req.body.id_player_friend;
        if (id_player_friend) {
            if (my_id) {
                friendsModel.add(my_id, id_player_friend)
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
                res.status(400).send({ e: "error mi id esta vacio en addFriend" });
            }
        } else {
            res.status(400).send({ e: "error el id de mi amigo esta vacio en addFriend" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}


// Listar mis amigos join user
friendsController.list = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let my_id = decoded.id_player;
        if (my_id) {
            friendsModel.list(my_id)
                .then(rows => {
                    if (rows.length > 0) {
                        res.send(rows);
                    } else {
                        res.send(rows);
                    }
                })
                .catch(err => {
                    res.status(400).send({ e: err });
                });
        } else {
            res.status(400).send({ e: "error mi id esta vacio en listFriend" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}

// Listar amigos de playerID
friendsController.listById = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let my_id = req.params.id;
        if (my_id) {
            friendsModel.listById(my_id)
                .then(rows => {
                    if (rows.length > 0) {
                        res.send(rows);
                    } else {
                        //aqui deberia de enviar error que no la lista viene vacia
                        //pero lo controlo en el front
                        res.send(rows);
                    }
                })
                .catch(err => {
                    res.status(400).send({ e: err });
                });
        } else {
            res.status(400).send({ e: "error mi id esta vacio en listFriend" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}


//Aceptar amistad  la amistad
friendsController.edit = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let my_id = decoded.id_player;
        let id_friends = +req.params.id;
        if (id_friends) {
            if (my_id) {
                let accepted = 1;
                friendsModel.edit(accepted, id_friends, my_id)
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
                res.status(400).send({ e: "error my id no existe"});
            }
        } else {
            res.status(400).send({ e: "error el id de amistad no existe" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}

//Cambiar a visto a mi nuevo amigo
friendsController.editWatched = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let my_id = decoded.id_player;
        let id_friends = +req.params.id;
        if (id_friends) {
            if (my_id) {
                let watched = 1;
                friendsModel.editWatched(watched, id_friends, my_id)
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
                res.status(400).send({ e: "error my id no existe" });
            }
        } else {
            res.status(400).send({ e: "error el id de amistad no existe" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}


// borrar peticion de amistad 
friendsController.delete = (req, res) => {
    try {
        const id_friends = +req.params.id;
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        my_id = decoded.id_player
        if (id_friends) {
            if (my_id) {
                friendsModel.delete(id_friends, my_id)
                    .then(row => {
                        res.send(row);
                    })
                    .catch(err => {
                        res.status(400).send({ e: err });
                    });
            } else {
                res.status(400).send({ e: "error my id no existe en delete amistad " });
            }
        } else {
            res.status(400).send({ e: "error el id de amistad no existe en delete amistad" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
};

module.exports = friendsController;