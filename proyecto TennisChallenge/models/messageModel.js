const dbConn = require('../config/db');

const messageModel = {};

//crea un mensaje
messageModel.add = msg => {
    return new Promise((resolve, reject) => {
        console.log("entra en el modelo addmessage")
        dbConn.query('INSERT INTO messages (id_player_sent,id_player_destiny,subject,text) VALUES (' +
            `${msg.id_player_sent}, ${msg.id_player_destiny},'${msg.subject}','${msg.text}')`,
            (err, result) => {
                console.log("ya he terminado la consula insertar message");
                if (err) {
                    console.log("error en la consulta insertar message");
                    reject(err);
                } else {
                    console.log("consulta de insertar message correcta");
                    resolve(result);
                }
            }
        );
    });
};

//mensaje visto por destinatario(editar campo visto)
messageModel.edit = (watched,id_message,id_player_destiny) => {
    return new Promise((resolve, reject) => {
        console.log("entra en el modelo editmessage");
        // dbConn.query('UPDATE messages SET watched = ? WHERE id_messages = ? AND id_player_destiny = ?',[watched,id_message,id_player_destiny],
        dbConn.query('UPDATE messages SET watched = ? WHERE id_messages = ? AND id_player_destiny = ?',[watched,id_message,id_player_destiny],
 
        (err, result) => {
                console.log("ya he terminado la consula editar message");
                if (err) {
                    console.log("error en la consulta editar message");
                    reject(err);
                } else {
                    console.log("consulta de insertar editar correcta");
                    resolve(result);
                }
            }
        );
    });
};

   
// Listar mis mensajes join user
messageModel.list = (id_player) => {
    return new Promise((resolve, reject) => {
        console.log("entra en el modelo listmessage")
        // SELECT * FROM (SELECT * FROM messages AS m  WHERE (m.id_player_sent = 3 || m.id_player_destiny= 3)) As m INNER JOIN players AS p  WHERE (m.id_player_sent <> 3 AND m.id_player_sent= p.id_player) OR (m.id_player_destiny <> 3 AND m.id_player_destiny= p.id_player);
        dbConn.query('SELECT * FROM messages AS m INNER JOIN players AS p WHERE (m.id_player_sent = ' +
         id_player + ' && m.id_player_destiny = p.id_player) OR ' + 
        '(m.id_player_destiny = '+ id_player + ' && m.id_player_sent = p.id_player)',
        //     'SELECT * FROM (SELECT * FROM messages AS m  WHERE (m.id_player_sent = ' 
        // + id_player + ' || m.id_player_destiny = ' + id_player + ')) AS m INNER JOIN players AS p '+
        // 'WHERE (m.id_player_sent <> '+ id_player +' AND m.id_player_sent = p.id_player)'+
        //  'OR (m.id_player_destiny <> ' + id_player + ' AND m.id_player_destiny= p.id_player)',
        // dbConn.query('SELECT * FROM messages WHERE id_player_sent = ? OR id_player_destiny = ?',
        // [id_player,id_player],
            (err, result) => {
                console.log("ya he terminado la consula buscar mis messages");
                if (err) {
                    console.log("error en la consulta buscar mis messages");
                    reject(err);
                } else {
                    console.log("consulta de buscar mis messages");
                    resolve(result);
                }
            }
        );
    });
};

module.exports = messageModel;