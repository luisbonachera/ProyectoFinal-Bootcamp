const messageModel = require('../models/messageModel');
const messageController = {};
const jwt = require("jsonwebtoken");

//crea un mensaje
messageController.add = (req, res) => {
    console.log(req.headers.authorization);
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  try {
    // console.log(jwt.verify(token,"mysecret"));
    const decoded = jwt.verify(token, "mysecret");
    let msg = req.body;
    console.log(msg);
    if (msg){
        console.log("1");
        if(msg.id_player_destiny &&
            msg.text){///terminar de comprobar campos no vacios
                console.log("2");
                console.log()
                msg = {
                    ...msg,
                   
                    id_player_destiny: +msg.id_player_destiny,
                    id_player_sent: decoded.id_player
                }
                console.log(msg);
                messageModel.add(msg)
                .then(rows => {
                    console.log("bien");
                    res.send({
                        type:"success",
                        data:rows
                    });
                })
                .catch(err =>{
                    console.log("mal");
                    res.send({
                        type:"error",
                        data: err
                    });
                });

        }else{
            res.send({
                type:"error el mensaje tiene algun campo vacio"
            });
        }
    }else {
        res.send({
            type:"error el mensaje esta vacio"
        });
    }
}catch(err){
    res.send("error al verficar token en enviar mensaje o del body del msg");
}
    
}


module.exports = messageController;