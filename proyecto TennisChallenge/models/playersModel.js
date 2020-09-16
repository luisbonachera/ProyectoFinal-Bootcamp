const dbConn = require('../config/db');

playersModel = {};

const SQL_FIND_ALL_PLAYERS = () => 'SELECT id_player,username,email,city,genre'
    + ',rating,avatar,isAdmin FROM players WHERE erased = 0';

const SQL_FIND_PLAYER_BY_ID = () => 'SELECT id_player,username,email,city,genre'
    + ',rating,avatar,isAdmin FROM players WHERE erased = 0 AND id_player = ? ';

const SQL_ADD_PLAYER = () => 'INSERT INTO players set ?';

const SQL_EDIT_PLAYER = () => 'UPDATE players SET ? WHERE id_player = ?';

const SQL_DELETE_PLAYER = () => 'DELETE FROM players WHERE id_player = ?';


//Listar Players con campo borrado == true
playersModel.list = (isAmin) => {
    return new Promise((resolve, reject) => {
        // dbConn.query('SELECT id_player,username,email,city,genre'
        // + ',rating,avatar,isAdmin FROM players WHERE erased = 0',
        dbConn.query(
            SQL_FIND_ALL_PLAYERS(),
            (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            }
        );
    })
};

//Listar Players con campo borrado == true
playersModel.listById = (id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_FIND_PLAYER_BY_ID(), [id_player],
            (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            }
        );
    })
};

//listar por filtros NO USADO
playersModel.listFiltros = (isAmin, filtros) => {
    return new Promise((resolve, reject) => {
        let SQL_FIND_ALL_PLAYERS = 'SELECT id_player,username,email,city,genre,rating';
        if (isAmin) {
            SQL_FIND_ALL_PLAYERS = SQL_FIND_ALL_PLAYERS + ',isAdmin';
        }
        SQL_FIND_ALL_PLAYERS = SQL_FIND_ALL_PLAYERS + ' FROM players WHERE erased = 0';
        const filtrosArray = [];
        if (filtros.username || filtros.city || (filtros.ratingFrom && filtros.ratingTo)) {
            SQL = SQL_FIND_ALL_PLAYERS + ' AND';
            if (filtros.username) {
                SQL = SQL + ' username = ?';
                filtrosArray.push(filtros.username);
                if (filtros.city || (filtros.ratingFrom && filtros.ratingTo)) {
                    SQL = SQL + ' AND';
                }
            }
            if (filtros.city) {
                SQL = SQL + ' city = ?';
                filtrosArray.push(filtros.city);
                if (filtros.ratingFrom && filtros.ratingTo) {
                    SQL = SQL + ' AND';
                }
            }
            if (filtros.ratingFrom && filtros.ratingTo) {
                SQL = SQL + ' rating >= ? AND rating <= ?';
                filtrosArray.push(filtros.ratingFrom);
                filtrosArray.push(filtros.ratingTo);
            }
        }
        dbConn.query(
            SQL, filtrosArray,
            (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            }
        );
    })
};




//crear un Jugador
playersModel.add = player => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_ADD_PLAYER(), [player],
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

// editar imagen de un Jugador NO USADO 
playersModel.editImage = (player, id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_EDIT_PLAYER(), [player, id_player],
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


// editar un Jugador 
playersModel.edit = (player, id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_EDIT_PLAYER(), [player, id_player],
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

// editar el campo borrado a true del player con id_player si eres tu 
// o si eres Administrador
playersModel.editErased = (user, id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_EDIT_PLAYER(), [user, id_player],
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


// borrar un Jugador NO USADO
playersModel.delete = (id_player) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_DELETE_PLAYER(), [id_player],
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

module.exports = playersModel;