const dbConn = require('../config/db');

const messageModel = {};

messageModel.add = msg => {
    return new Promise((resolve,reject) => {
        dbConn.query( `INSERT INTO messages (id_player_sent,id_player_destiny,text) VALUES (`
        `${msg.id_player_sent}, ${msg.id_player_destiny}, ${msg.text})`,
        (err,result)=>{
            console.log("ya he terminado la consula insertar message");
            if(err){
                console.log("error en la consulta insertar message");
                reject(err);
            }else{
                console.log("consulta de insertar message correcta");
                resolve(result);
            }
        }
    );
});
};


module.export = messageModel;