const messageModel = require('../models/messageModel');
const messageController = {};
const jwt = require("jsonwebtoken");

//crea un mensaje
messageController.add = (req, res) => {

    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        // console.log(jwt.verify(token,"mysecret"));
        const decoded = jwt.verify(token, "mysecret");
        let msg = req.body;
        console.log(msg);
        if (msg) {
            console.log("1");
            if (msg.id_player_destiny &&
                msg.text) {
                console.log("2");
                msg = {
                    ...msg,
                    id_player_sent: decoded.id_player,

                }
                console.log(msg);
                messageModel.add(msg)
                    .then(rows => {
                        console.log("bien");
                        res.send({
                            type: "success",
                            data: rows
                        });
                    })
                    .catch(err => {
                        console.log("mal");
                        res.status(400).send({ e: err });
                        // res.send({
                        //     type: "error",
                        //     data: err
                        // });
                    });

            } else {
                res.send({
                    type: "error el mensaje tiene algun campo vacio"
                });
            }
        } else {
            res.send({
                type: "error el mensaje esta vacio"
            });
        }
    } catch (err) {
        res.send("error al verficar token en enviar mensaje o del body del msg");
    }
}


//mensaje visto por destinatario(editar campo visto)
messageController.edit = (req, res) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        const decoded = jwt.verify(token, "mysecret");
        let id_player_destiny = decoded.id_player;
        let id_message = req.params.id;
        console.log(id_message);
        if (id_message) {
            console.log("1");

            let watched = 1

            console.log(watched);
            messageModel.edit(watched, id_message, id_player_destiny)
                .then(rows => {
                    console.log("bien");
                    res.send({
                        type: "success",
                        data: rows
                    });
                })
                .catch(err => {
                    console.log("mal");
                    res.send({
                        type: "error",
                        data: err
                    });
                });
        } else {
            res.status(401).send("error el mensaje tiene algun campo vacio");
        }
    } catch (err) {
        res.status(401).send("error al verficar token en enviar mensaje o del body del msg");
    }
}

// Listar mis mensajes join user
messageController.list = (req, res) => {

    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        const decoded = jwt.verify(token, "mysecret");
        let id_player = decoded.id_player;
        if (id_player) {
            console.log("1");
            messageModel.list(id_player)
                .then(rows => {
                    if (rows.length > 0) {
                        console.log("bien");
                        res.send(rows);
                    } else {
                        console.log("no hay mensajes");
                        res.send(rows);
                    }

                })
                .catch(err => {
                    console.log("mal");
                    res.send({
                        type: "error",
                        data: err
                    });
                });

        } else {
            res.status(401).send("error el mensaje tiene algun campo vacio");
        }
    } catch (err) {
        res.status(401).send("error al verficar token en enviar mensaje o del body del msg");
    }
}


module.exports = messageController;