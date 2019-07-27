const dbConn = require('../config/db');

const SQL_FIND_ALL_ACTOR = "SELECT * FROM actor";
const SQL_FIND_ONE_ACTOR_ID = "SELECT * FROM players WHERE email = data.email AND password = data.password";

authModel = {};

authModel.checkUser = user => {
    return new Promise((resolve,reject)=> {
        
        dbConn.query(
            'SELECT * FROM players WHERE username = ? AND password = ?',[user.username, user.password],
            (err,result)=>{
                console.log("ya he terminado la consulata buscar usuario");
                if(err){
                    console.log("error en la consulta");
                    reject(err);
                }else{
                    console.log("consulta de buscar usuario correcta");
                    resolve(result);
                }
            }
        );
    });

};

module.exports = authModel;