const dbConn = require('../config/db');


playersModel = {};


//crear un Jugador
playersModel.add = user => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'INSERT INTO players set ?', [user],
            (err,result)=>{
                console.log("ya he terminado la consula insertar usuario");
                if(err){
                    console.log("error en la consulta");
                    reject(err);
                }else{
                    console.log("consulta de insertar usuario correcta");
                    resolve(result);
                }
            }
        );
    });
};

// editar un Jugador 
playersModel.edit = (user,id_player) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'UPDATE players SET ? WHERE id_player = ?', [user, id_player],
            (err,result)=>{
                console.log("ya he terminado la consula editar usuario");
                if(err){
                    console.log("error en la consulta editar " + err);
                    reject(err);
                }else{
                    console.log("consulta de editar usuario correcta");
                    resolve(result);
                }
            }
        );
    });
};


// borrar un Jugador 
playersModel.delete = (id_player) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'DELETE FROM players WHERE id_player = ?', [id_player],
            (err,result)=>{
                console.log("ya he terminado la consula borrar usuario");
                if(err){
                    console.log("error en la consulta borrar " + err);
                    reject(err);
                }else{
                    console.log("consulta de borrar usuario correcta");
                    resolve(result);
                }
            }
        );
    });
};

module.exports = playersModel;