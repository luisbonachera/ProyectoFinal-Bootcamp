

const friendsModel = require("../models/friendsModel");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
// const secret = "lo se yo";
const secret = "mysecret";

const friendsController = {};

//crea un amigo
friendsController.add = (req, res) => {

    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        // console.log(jwt.verify(token,"mysecret"));
        const decoded = jwt.verify(token, "mysecret");
        let my_id = decoded.id_player;
        let id_player_friend = req.body.id_player_friend;
        if (id_player_friend) {
            if (my_id) {
                console.log("friend: " + id_player_friend);
                console.log("My id: " + my_id);
                friendsModel.add(my_id, id_player_friend)
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
                res.status(401).send("error mi id esta vacio en addFriend");
            }
        } else {
            res.status(401).send("error el id de mi amigo esta vacio en addFriend");
        }
    } catch (err) {
        res.send("error al verficar token o decodificarlo, o mi o id:friend esta vacio en addFriend" + err);
    }
}


// Listar mis amigos join user
friendsController.list = (req, res) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        const decoded = jwt.verify(token, "mysecret");
        let my_id = decoded.id_player;
        if (my_id) {
            friendsModel.list(my_id)
                .then(rows => {
                    if (rows.length > 0) {
                        console.log("bien, hay amigos");
                        res.send(rows);
                    } else {
                        console.log("no hay amigos");
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
            res.status(401).send("error mi id esta vacio en listFriend");
        }
    } catch (err) {
        res.status(401).send("error en token o al verficarlo en listFriend. " + err);
    }
}

//Aceptar amistad y poner a watched=true la amistad
friendsController.edit = (req, res) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        const decoded = jwt.verify(token, "mysecret");
        let my_id = decoded.id_player;
        let id_friends = +req.params.id;
        console.log(id_friends);
        console.log(my_id);
        if (id_friends) {
            if (my_id) {
                let watched = 1;
                let accepted = 1;
                console.log(watched);
                friendsModel.edit(watched, accepted, id_friends, my_id)
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
                res.status(401).send("error my id no existe");
            }
        } else {
            res.status(401).send("error el id de amistad no existe");
        }
    } catch (err) {
        res.status(401).send("error en el token o al verficarlo. " + err);
    }
}


// borrar peticion de amistad 
friendsController.delete = (req, res) => {
    try {
        const id_friends = req.params.id;
        console.log("id de url: " + id_friends);
        console.log(req.headers.authorization);
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        const decoded = jwt.verify(token, "mysecret");
        my_id = decoded.id_player
        console.log(decoded.id_player);
        if (id_friends) {
            console.log("entrar");
            if(my_id){
                friendsModel.delete(id_friends, my_id)
                .then(row => {
                    console.log("guayDeleteAmistadController");
                    res.send(row);
                })
                .catch(err => {
                    res.send("ErrorDeleteAmistadController....Petaaaaso");
                });
            }else{
                res.status(401).send("error my id no existe en delete amistad ");
            }
        } else {
           
            res.status(401).send("error el id de amistad no existe en delete amistad");
        }
    } catch(err) {
        res.status(401).send("You don`t have permission for delete friendship" + err);
    }
};



module.exports = friendsController;