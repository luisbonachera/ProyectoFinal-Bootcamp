const dbConn = require('../config/db');

const SQL_AUTH_PLAYER = () => 'SELECT * FROM players WHERE username = ?'
    + 'AND password = ? AND erased = 0';

authModel = {};

authModel.checkUser = user => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            SQL_AUTH_PLAYER(), [user.username, user.password],
            (err, result) => {
                console.log("ya he terminado la consulata buscar usuario");
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

module.exports = authModel;