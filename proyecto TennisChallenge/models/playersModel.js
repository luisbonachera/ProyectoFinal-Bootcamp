const dbConn = require('../config/db');


playersModel = {};


playersModel.list = (isAmin) => {
    return new Promise((resolve, reject) => {
        // if(!validate(data)) reject("Invalid data")
        let SQL_FIND_ALL_PLAYERS = 'SELECT id_player,username,email,city,genre,rating';

        if(isAmin){
            console.log("entra en la queray Admin= true")
            SQL_FIND_ALL_PLAYERS = SQL_FIND_ALL_PLAYERS + ', isAdmin';
        }
        dbConn.query(
            SQL_FIND_ALL_PLAYERS + ' FROM players',
            (err, result) => {
                console.log("Hay respuesta de la db es :" + err);
                if (err) reject(err);
                else {
                    console.log(result);
                    resolve(result);
                }
            }
        );
    })
};

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