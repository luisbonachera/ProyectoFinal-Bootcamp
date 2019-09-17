const dbConn = require('../config/db');

const messageModel = {};

const SQL_UPDATE_MESSAGE = () => 'UPDATE messages SET watched = ? WHERE id_messages = ? AND id_player_destiny = ?';

const SQL_LIST_MY_MESSAGES_INCLUDE_USERS = () => 'SELECT * FROM messages AS m INNER JOIN players AS p WHERE (m.id_player_sent = ' +
    '? && m.id_player_destiny = p.id_player) OR (m.id_player_destiny = ? && m.id_player_sent = p.id_player) ORDER BY m.date DESC';

const SQL_LIST_MY_MESSAGES_NOT_SEEN_INCLUDE_USERS = () => 'SELECT * FROM messages AS m INNER JOIN players AS p WHERE (m.id_player_sent = ' +
    '? && m.id_player_destiny = p.id_player) OR (m.id_player_destiny = ? && m.id_player_sent = p.id_player) ORDER BY m.date DESC'

//crea un mensaje
messageModel.add = msg => {
    return new Promise((resolve, reject) => {
        dbConn.query('INSERT INTO messages (id_player_sent,id_player_destiny,subject,text) VALUES (' +
            `${msg.id_player_sent}, ${msg.id_player_destiny},'${msg.subject}','${msg.text}')`,
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

//mensaje visto por destinatario(editar campo visto)
messageModel.edit = (watched, id_message, id_player_destiny) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_UPDATE_MESSAGE, [watched, id_message, id_player_destiny],
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


// Listar mis mensajes join user
messageModel.list = (id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_LIST_MY_MESSAGES_INCLUDE_USERS, [id_player, id_player],
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

// contar mis mensajes no vistos join user
messageModel.list = (id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(SQL_LIST_MY_MESSAGES_NOT_SEEN_INCLUDE_USERS, [id_player, id_player],
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

module.exports = messageModel;