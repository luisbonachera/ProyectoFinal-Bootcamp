const dbConn = require('../config/db');

const friendsModel = {};

const SQL_LIST_MY_FRIENDS_JOIN_USER = () => 'SELECT * FROM friends AS f ' +
    'INNER JOIN players AS p WHERE ( (f.id_player1 = ? && ' +
    'f.id_player2 = p.id_player) OR (f.id_player2 = ? && ' +
    'f.id_player1 = p.id_player) ) AND p.erased = false';

const SQL_LIST_FRIENDS_OF_PLAYER_ID_JOIN_USER = () => 'SELECT * FROM ' +
    'friends AS f INNER JOIN players AS p WHERE ( (f.id_player1 = ? && ' +
    'f.id_player2 = p.id_player) OR (f.id_player2 = ? && ' +
    'f.id_player1 = p.id_player) ) AND p.erased = false AND f.accepted = true';


const SQL_EDIT_ACCEPT_FRIENDSHIP_TO_TRUE = () => 'UPDATE friends SET ' +
    'accepted = ? WHERE id_friends = ? AND id_player2 = ?';

const SQL_EDIT_NEW_FRIEND_TO_SEEN = () => 'UPDATE friends SET watched = ? WHERE' +
    'id_friends = ? AND id_player1 = ?';

const SQL_DELETE_FRIENDSHIP = () => 'DELETE FROM friends WHERE id_friends = ?' +
    ' AND (id_player1 = ? OR id_player2 = ?)';


//crea un amigo
friendsModel.add = (my_id, id_player_friend) => {
    return new Promise((resolve, reject) => {
        dbConn.query('INSERT INTO friends (id_player1 ,id_player2) VALUES (' +
            `${my_id}, ${id_player_friend})`,
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

// Listar mis amigos join user
friendsModel.list = (my_id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_LIST_MY_FRIENDS_JOIN_USER(), [my_id, my_id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

// Listar amigos de playerID
friendsModel.listById = (my_id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_LIST_FRIENDS_OF_PLAYER_ID_JOIN_USER(), [my_id, my_id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

//Aceptar amistad y poner a watched=true la amistad
friendsModel.edit = (accepted, id_friends, my_id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_EDIT_ACCEPT_FRIENDSHIP_TO_TRUE(), [accepted, id_friends, my_id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

//Cambiar a visto a mi nuevo amigo
friendsModel.editWatched = (watched, id_friends, my_id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_EDIT_NEW_FRIEND_TO_SEEN(), [watched, id_friends, my_id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

// borrar peticion de amistad 
friendsModel.delete = (id_friends, my_id) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_DELETE_FRIENDSHIP(), [id_friends, my_id, my_id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

module.exports = friendsModel;