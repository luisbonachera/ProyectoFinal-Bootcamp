const messageModel = require('../models/messageModel');
const messageController = {};
const jwt = require("jsonwebtoken");
const secret = "mysecret";

//crea un mensaje
messageController.add = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let msg = req.body;
        if (msg) {
            if (msg.id_player_destiny &&
                msg.text) {
                msg = {
                    ...msg,
                    id_player_sent: decoded.id_player,
                }
                messageModel.add(msg)
                    .then(rows => {
                        console.log("bien");
                        res.send({
                            type: "success",
                            data: rows
                        });
                    })
                    .catch(err => {
                        res.status(400).send({ e: err });
                    });
            } else {
                res.status(400).send({ e: "error el mensaje tiene algun campo vacio" });
            }
        } else {
            res.status(400).send({ e: "error el mensaje esta vacio" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}


//mensaje visto por destinatario(editar campo visto)
messageController.edit = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let id_player_destiny = decoded.id_player;
        let id_message = req.params.id;
        if (id_message) {
            let watched = 1
            messageModel.edit(watched, id_message, id_player_destiny)
                .then(rows => {
                    console.log("bien");
                    res.send({
                        type: "success",
                        data: rows
                    });
                })
                .catch(err => {
                    res.status(400).send({ e: err });
                });
        } else {
            res.status(400).send({ e: "error el mensaje tiene algun campo vacio" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}

// Listar mis mensajes join user
messageController.list = (req, res) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, secret);
        let id_player = decoded.id_player;
        if (id_player) {
            messageModel.list(id_player)
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
            res.status(400).send({ e: "error el mensaje tiene algun campo vacio" });
        }
    } catch (err) {
        res.status(400).send({ e: err });
    }
}


module.exports = messageController;