const dbConn = require('../config/db');


playersModel = {};

//Listar Players con campo borrado == true
playersModel.list = (isAmin) => {
    return new Promise((resolve, reject) => {
        // if(!validate(data)) reject("Invalid data")
        let SQL_FIND_ALL_PLAYERS = 'SELECT id_player,username,email,city,genre,rating';

        if(isAmin){
            console.log("entra en la queray Admin= true")
            SQL_FIND_ALL_PLAYERS = SQL_FIND_ALL_PLAYERS + ', isAdmin';
        }
        dbConn.query(
            SQL_FIND_ALL_PLAYERS + " FROM players WHERE erased = 0",
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

//listar por filtros NO USADO
playersModel.listFiltros = (isAmin,filtros) => {
    return new Promise((resolve, reject) => {
        // if(!validate(data)) reject("Invalid data")
        let SQL_FIND_ALL_PLAYERS = 'SELECT id_player,username,email,city,genre,rating';

        if(isAmin){
            console.log("entra en la queray Admin= true")
            SQL_FIND_ALL_PLAYERS = SQL_FIND_ALL_PLAYERS + ',isAdmin';
        }
        SQL_FIND_ALL_PLAYERS = SQL_FIND_ALL_PLAYERS + ' FROM players WHERE erased = 0';
        //quie entrar si existe algun campo de filtro
        const filtrosArray = [];
        if(filtros.username || filtros.city || (filtros.ratingFrom && filtros.ratingTo) ){
            console.log(filtros.username);
            console.log(filtros.city );
            console.log(filtros.ratingFrom);
            console.log(filtros.ratingTo);
            SQL = SQL_FIND_ALL_PLAYERS + ' AND';
           
            if(filtros.username){
                SQL = SQL + ' username = ?';
                filtrosArray.push(filtros.username);
                if(filtros.city || (filtros.ratingFrom && filtros.ratingTo)){
                    SQL = SQL + ' AND';
                }
            }
            if(filtros.city ){
                SQL = SQL + ' city = ?';
                filtrosArray.push(filtros.city);
                //algo para decir que ponga ,[filtros.city] despues de la query
                if(filtros.ratingFrom && filtros.ratingTo){
                    SQL = SQL + ' AND';
                }
            }
            if(filtros.ratingFrom && filtros.ratingTo){
                SQL = SQL + ' rating >= ? AND rating <= ?';
                filtrosArray.push(filtros.ratingFrom);
                filtrosArray.push(filtros.ratingTo);
            }
        }
        dbConn.query(
            SQL,filtrosArray,
            (err, result) => {
                console.log("Hay respuesta de la db es listarFiltrar:" + err);
                if (err) reject(err);
                else {
                    console.log(result);
                    resolve(result);
                }
            }
        );
    })
};




//crear un Jugador
playersModel.add = user => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'INSERT INTO players set ?', [user],
            (err,result)=>{
                console.log("ya he terminado la consula insertar usuario");
                if(err){
                    console.log("error en la consulta");
                    console.log(err);
                    reject(err);
                }else{
                    console.log("consulta de insertar usuario correcta");
                    console.log(result);
                    resolve(result);
                }
            }
        );
    });
};

// editar un Jugador 
playersModel.edit = (user,id_player) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'UPDATE players SET ? WHERE id_player = ?', [user, id_player],
            (err,result)=>{
                console.log("ya he terminado la consula editar usuario");
                if(err){
                    console.log("error en la consulta editar " + err);
                    reject(err);
                }else{
                    console.log("consulta de editar usuario correcta");
                    resolve(result);
                }
            }
        );
    });
};



// editar el campo borrado a true del player con id_player si eres tu o si eres Administrador
playersModel.editErased = (user,id_player) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'UPDATE players SET ? WHERE id_player = ?', [user, id_player],
            (err,result)=>{
                console.log("ya he terminado la consula editar usuario");
                if(err){
                    console.log("error en la consulta editar " + err);
                    reject(err);
                }else{
                    console.log("consulta de editar usuario correcta");
                    resolve(result);
                }
            }
        );
    });
};


// borrar un Jugador 
playersModel.delete = (id_player) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            'DELETE FROM players WHERE id_player = ?', [id_player],
            (err,result)=>{
                console.log("ya he terminado la consula borrar usuario");
                if(err){
                    console.log("error en la consulta borrar " + err);
                    reject(err);
                }else{
                    console.log("consulta de borrar usuario correcta");
                    resolve(result);
                }
            }
        );
    });
};

module.exports = playersModel;