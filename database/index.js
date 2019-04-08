const mysql = require('mysql')
 
const db = mysql.createConnection({
    host : 'localhost',
    user: 'jamal' ,
    password : 'jamaludin' ,
    database : 'authentication_test' ,
    port : 3306 ,
})

module.exports = db

