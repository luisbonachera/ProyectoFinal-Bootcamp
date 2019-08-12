const dbConn = require('../config/db');

const friendsModel = {};

//crea un amigo
friendsModel.add = (my_id,id_player_friend) => {
    return new Promise((resolve, reject) => {
        console.log("entra en el modelo addmessage")
        dbConn.query('INSERT INTO friends (id_player1 ,id_player2) VALUES (' +
            `${my_id}, ${id_player_friend})`,
            (err, result) => {
                console.log("ya he terminado la consula insertar amigo");
                if (err) {
                    console.log("error en la consulta insertar amigo");
                    reject(err);
                } else {
                    console.log("consulta de insertar amigo correcta");
                    resolve(result);
                }
            }
        );
    });
};


// Listar mis amigos join user
friendsModel.list = (my_id) => {
    return new Promise((resolve, reject) => {
        console.log("entra en el modelo listmessage")
        dbConn.query('SELECT * FROM friends AS f INNER JOIN players AS p WHERE (f.id_player1 = ' +
        my_id + ' && f.id_player2 = p.id_player) OR ' + 
        '(f.id_player2 = '+ my_id + ' && f.id_player1 = p.id_player)',
            (err, result) => {
                console.log("ya he terminado la consula buscar mis amigos");
                if (err) {
                    console.log("error en la consulta buscar mis amigos");
                    reject(err);
                } else {
                    console.log("consulta de buscar mis amigos termian bien.");
                    resolve(result);
                }
            }
        );
    });
};


//Aceptar amistad y poner a watched=true la amistad
friendsModel.edit = (accepted,id_friends,my_id) => {
    return new Promise((resolve, reject) => {
        console.log("entra en el modelo editmessage");
        dbConn.query('UPDATE friends SET accepted = ? WHERE id_friends = ? AND id_player2 = ?',[accepted,id_friends,my_id],
        (err, result) => {
                console.log("ya he terminado la consula aceptar amistar");
                if (err) {
                    console.log("error en la consulta aceptar amistar");
                    reject(err);
                } else {
                    console.log("consulta de aceptar amistar correcta");
                    resolve(result);
                }
            }
        );
    });
};


// borrar peticion de amistad 
friendsModel.delete = (id_friends, my_id) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'DELETE FROM friends WHERE id_friends = ? AND (id_player1 = ? OR id_player2 = ?)', [id_friends,my_id,my_id],
            (err,result)=>{
                console.log("ya he terminado la consula borrar amistad");
                if(err){
                    console.log("error en la consulta borrar amistad" + err);
                    reject(err);
                }else{
                    console.log("consulta de borrar amistad correcta");
                    resolve(result);
                }
            }
        );
    });
};


module.exports = friendsModel;