const dbConn = require('../config/db');
const sha256 = require("sha256");

playersModel = {};

playersModel.add = user => {
    return new Promise((resolve, reject)=>{
        pasSha256 = sha256(user.password);
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

module.exports = playersModel;