const dbConn = require('../config/db');


notificationsModel = {};

//Listar Players con campo borrado == true
notificationsModel.counter = (id_player) => {
    return new Promise((resolve, reject) => {
        // if(!validate(data)) reject("Invalid data")
        let SQL_FIND_ALL_NOTIFICATIONS = "SELECT COUNT(m.id_messages) as numbers_messages, COUNT(f.id_friends) " +
        "as numbers_friends FROM messages as m INNER JOIN  friends as f WHERE " +
        "m.id_player_destiny = f.id_player2 AND m.id_player_destiny = ? AND m.watched = '0' "+
         "and f.id_player2 = ? AND f.accepted = '0'";
        
        dbConn.query(
            SQL_FIND_ALL_NOTIFICATIONS,[id_player,id_player],
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

module.exports = notificationsModel;