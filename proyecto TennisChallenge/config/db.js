const mysql = require("mysql");

//create connection to dabase
const dbConn =mysql.createConnection({
host:'localhost',
user:'root',
password:'1234',
database:'proyectotenis',
});

//connect to database
dbConn.connect(err => {
    if (err) throw err;
});

console.log('Conected to database ');
// console.log(dbConn);


//export db to have it available
module.exports = dbConn;