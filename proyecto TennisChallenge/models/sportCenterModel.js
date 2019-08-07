const dbConn = require('../config/db');
sportCenterModel = {};

//crear un centro deportivo si eres admin
sportCenterModel.add = sportCenter => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'INSERT INTO sports_center set ?', [sportCenter],
            (err,result)=>{
                console.log("ya he terminado la consula insertar usuario");
                if(err){
                    console.log("error en la consulta");
                    console.log(err);
                    reject("error en la consulta " + err);
                }else{
                    console.log("consulta de insertar usuario correcta");
                    console.log(result);
                    resolve(result);
                }
            }
        );
    });
};


// Listar centros deportivos
sportCenterModel.list = () => {
    return new Promise((resolve, reject) => {
        // if(!validate(data)) reject("Invalid data")
        let SQL_FIND_ALL_SPORTCENTERS = 'SELECT * FROM sports_center';
        dbConn.query(
            SQL_FIND_ALL_SPORTCENTERS,
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


// editar un Jugador 
sportCenterModel.edit = (sportCenter,id_sports_center) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'UPDATE sports_center SET ? WHERE id_sports_center = ?', [sportCenter,id_sports_center],
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



// borrar Centro Deportivo si eres admin
sportCenterModel.delete = (id_sports_center) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'DELETE FROM sports_center WHERE id_sports_center = ?', [id_sports_center],
            (err,result)=>{
                console.log("ya he terminado la consula borrar centro deportivo");
                if(err){
                    console.log("error en la consulta borrar  centro deportivo " + err);
                    reject(err);
                }else{
                    console.log("consulta de borrar  centro deportivo correcta");
                    resolve(result);
                }
            }
        );
    });
};


module.exports = sportCenterModel;