const dbConn = require('../config/db');

notificationsModel = {};

const SQL_FIND_ALL_NOTIFICATIONS = () => "SELECT numbers_messages, numbers_requestFriend, numbers_acceptedFriend FROM " + 
"(SELECT COUNT(m.id_messages) as numbers_messages, ? as id_player_destiny " +
 "FROM messages as m  WHERE m.id_player_destiny = ? AND m.watched = 0) as A " +
"INNER JOIN " +
"(" +
  "SELECT COUNT(A.id_player2) as numbers_requestFriend, id_player2 FROM " +
    "(SELECT ? as id_player2, f.id_player1 " +
     "FROM friends as f WHERE f.id_player2 = ? AND f.accepted = 0) as A " +
  "INNER JOIN " +
    "(SELECT id_player, username, erased as PlayerErased FROM players as p WHERE p.erased = 0) as B " +
  "ON B.id_player = A.id_player1 " +
") as B " +
"ON  A.id_player_destiny = B.id_player2 " +
"INNER JOIN " +
"(" +
"SELECT COUNT(A.id_player2) as numbers_acceptedFriend, id_player1 FROM " +
  "(SELECT ? as id_player1, f2.id_player2 " +
  "FROM friends as f2 WHERE f2.id_player1 = ? AND f2.watched = 0 AND f2.accepted = 1) as A " +
"INNER JOIN " +
  "(SELECT id_player, username, erased FROM players as p WHERE p.erased = 0) as B " +
"ON B.id_player = A.id_player2 " +
") as C " +
"ON C.id_player1 = B.id_player2";


//Listar Players con campo borrado == true
notificationsModel.counter = (id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_FIND_ALL_NOTIFICATIONS(),[id_player,id_player,id_player,id_player,id_player,id_player],
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